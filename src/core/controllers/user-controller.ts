import asyncRouteHandler from 'src/core/middleware/shared/async-middleware';
import * as projSchema from 'src/core/schema';
import * as userSchema from 'src/core/schema/user-schema';
import * as arrayUtils from 'src/common/utils/datatype/array-utils';
import * as datetimeUtils from 'src/common/utils/datatype/datetime-utils';
import * as httpHeadersUtils from 'src/common/utils/http-context/headers';
import { UserService } from 'src/core/services/user-service';
import { AuthTokenCookie } from 'src/common/plugins/express/auth-cookie';
import {
  UnauthorizedErrorBuilder,
  NotFoundErrorBuilder,
  ForbiddenErrorBuilder,
  GoneErrorBuilder,
} from 'src/storage/http-errors';

const userService = new UserService();
const loginRefreshTokenCookie = new AuthTokenCookie(
  { name: 'refreshToken' },
  { domain: 'mysite.com' }
);

const getLoginSessionTokenExpirationDates = () => {
  return {
    accessExpiresIn:
      Date.now() + datetimeUtils.getMacroTimeAsMilliSeconds('15s'),

    refreshExpiresIn:
      Date.now() + datetimeUtils.getMacroTimeAsMilliSeconds('30min'),
  };
};

// auth-user
export const redirectWithCurrentUserAsTargetedUser = asyncRouteHandler(
  async (req, res, next) => {
    const accessToken = httpHeadersUtils.findAuthorizationToken(
      req.header('authorization'),
      'Bearer'
    );

    if (accessToken === null) {
      throw UnauthorizedErrorBuilder()
        .addContext({ message: 'Access token not provided' })
        .use();
    }

    const loggedInUser = await userService.getLoggedIn(accessToken.value);
    if (loggedInUser === null) {
      throw UnauthorizedErrorBuilder()
        .addContext({ message: 'User not currently logged in' })
        .use();
    }

    const { userId } = loggedInUser;
    const [reqUrlPath, reqUrlQueryParams] = req.originalUrl.split('?');
    const queryParams = reqUrlQueryParams ? `?${reqUrlQueryParams}` : '';
    const userIdAliasStartIndex = -1 * req.path.length; // alias === me
    const baseUsersApiRoute = reqUrlPath.slice(0, userIdAliasStartIndex);
    return res.redirect(`${baseUsersApiRoute}/${userId}${queryParams}`);
  }
);

// all-user
export const getUsers = asyncRouteHandler(async (req, res, next) => {
  const retrivedUsers = await userService.find({ limit: 5 });
  if (arrayUtils.isEmptyArray(retrivedUsers)) {
    throw NotFoundErrorBuilder()
      .addContext({ message: 'Could not find Users' })
      .use();
  }

  return res.kit.formatter.OK.addItems(retrivedUsers).use();
});

// one-user
export const registerUser = asyncRouteHandler(async (req, res, next) => {
  const userToBeRegistered = (
    req.locals.resourceValidation
      .user as projSchema.SuccessfulValidationResponse
  ).value as userSchema.RegistrationFormInput;

  const registeredUser = await userService.register(userToBeRegistered);
  if ('unavailableAttributesKeys' in registeredUser) {
    throw ForbiddenErrorBuilder()
      .addIssues((iss) => {
        return iss.forbidden({
          source: { content: '' },
          value: registeredUser.unavailableAttributesKeys,
          reason: 'already in use',
        });
      })
      .use();
  }

  return res.kit.formatter.data(registeredUser).send.Created();
});

export const getUser = asyncRouteHandler(async (req, res, next) => {
  const { userId } = req.locals.objectIdParamsValidation;
  const retrivedUser = await userService.getOne(userId.value);
  if (!retrivedUser) {
    throw NotFoundErrorBuilder()
      .addContext({
        message: `Could not find User, by the id: ${userId.value}`,
      })
      .use();
  }

  return res.kit.formatter.data(retrivedUser).send.OK();
});

export const editUser = asyncRouteHandler(async (req, res, next) => {
  const { userId } = req.locals.objectIdParamsValidation;
  const userUpdates = (
    req.locals.resourceValidation
      .user as projSchema.SuccessfulValidationResponse
  ).value as userSchema.EditFormInput;

  const editedUserFields = await userService.edit(userId.value, userUpdates);
  if (editedUserFields === null) {
    const message = `Could not update User, by the id: ${userId.value}`;
    throw NotFoundErrorBuilder().addContext({ message }).use();
  }

  if ('unavailableAttributesKeys' in editedUserFields) {
    throw ForbiddenErrorBuilder()
      .addIssues((iss) => {
        return iss.forbidden({
          source: { content: '' },
          value: editedUserFields.unavailableAttributesKeys,
          reason: 'already in use',
        });
      })
      .use();
  }

  if (arrayUtils.isEmptyArray(editedUserFields)) {
    return res.kit.formatter.send.NotModified();
  }

  const updatedUser = await userService.getOne(userId.value);
  return res.kit.formatter.data(updatedUser).send.OK();
});

export const deleteUser = asyncRouteHandler(async (req, res, next) => {
  const { userId } = req.locals.objectIdParamsValidation;
  const deletedUser = await userService.deleteOne(userId.value);
  if (!deletedUser) {
    throw GoneErrorBuilder()
      .addContext({
        message: `Could not delete User, by the id: ${userId.value}`,
      })
      .use();
  }

  return res.kit.formatter.data(deletedUser).send.OK();
});

// one-session
export const loginUser = asyncRouteHandler(async (req, res, next) => {
  const loginCredentials = (
    req.locals.resourceValidation
      .userLoginCredentials as projSchema.SuccessfulValidationResponse
  ).value as userSchema.LoginCredentialsInput;

  const { accessExpiresIn, refreshExpiresIn } =
    getLoginSessionTokenExpirationDates();

  const createdSession = await userService.login(loginCredentials, {
    accessExpiresIn,
    refreshExpiresIn,
  });

  if (createdSession === null || 'invalidCredentials' in createdSession) {
    throw UnauthorizedErrorBuilder()
      .addContext({ message: 'User Email or Password is Incorrect' })
      .use();
  }

  if ('alreadyOpened' in createdSession) {
    throw UnauthorizedErrorBuilder()
      .addContext({ message: 'User is currently logged in' })
      .use();
  }

  const { createdAccessToken, createdRefreshToken } = createdSession;
  loginRefreshTokenCookie.overwriteOptions({ maxAge: refreshExpiresIn });
  loginRefreshTokenCookie.attach(res, createdRefreshToken);
  return res.kit.formatter
    .data({ accessToken: createdAccessToken })
    .send.Created();
});

export const logoutUser = asyncRouteHandler(async (req, res, next) => {
  const accessToken = httpHeadersUtils.findAuthorizationToken(
    req.header('authorization'),
    'Bearer'
  );

  if (accessToken === null) {
    throw UnauthorizedErrorBuilder()
      .addContext({ message: 'Access token not provided' })
      .use();
  }

  const createdSession = await userService.logout(accessToken.value);
  if (createdSession === null) {
    throw UnauthorizedErrorBuilder()
      .addContext({ message: 'User is currently logged in' })
      .use();
  }

  loginRefreshTokenCookie.detach(res);
  return res.kit.formatter
    .addContext({ message: 'User successfully logged out' })
    .send.Gone();
});

export const keepUserLoggedIn = asyncRouteHandler(async (req, res, next) => {
  const refreshToken = loginRefreshTokenCookie.extract(req);
  const { accessExpiresIn, refreshExpiresIn } =
    getLoginSessionTokenExpirationDates();

  if (refreshToken === null) {
    throw UnauthorizedErrorBuilder()
      .addContext({ message: 'Refresh token not provided' })
      .use();
  }

  const refreshedSession = await userService.keepLoggedIn({
    currentRefreshToken: refreshToken.value,
    accessExpiresIn,
    refreshExpiresIn,
  });

  if (refreshedSession === null) {
    return res.json({ message: 'User not currently logged in' });
  }

  if ('expired' in refreshedSession) {
    throw UnauthorizedErrorBuilder()
      .addIssues((iss) => {
        return iss.expired({ reason: 'access token expired ' });
      })
      .use();
  }

  if ('hijacked' in refreshedSession) {
    return UnauthorizedErrorBuilder()
      .addContext({
        message: 'User session Hijacked. Please re-authenticate (login)',
      })
      .use();
  }

  if ('currentRefreshToken' in refreshedSession) {
    return res.kit.fomatter.send.NotModified();
  }

  const { createdAccessToken, createdRefreshToken } = refreshedSession;

  loginRefreshTokenCookie.overwriteOptions({ maxAge: refreshExpiresIn });
  loginRefreshTokenCookie.attach(res, createdRefreshToken);

  return res.kit.formatter
    .data({ accessToken: createdAccessToken })
    .send.Created();
});
