import * as types from './types';
import * as helpers from './helpers';
import * as mongooseRepository from 'src/core/services/_repository/mongoose-adapter';
import * as userSchema from 'src/core/schema/user-schema';
import * as arrayUtils from 'src/common/utils/datatype/array-utils';
import { UserDocument, UserModel } from 'src/core/models/user-model';
import { JwtSessionService } from 'src/core/services/jwt-session-service';

const loginSessionService = new JwtSessionService();

const CreateUserRepository = mongooseRepository.CreateRepository<UserDocument>;

const UserRepository = CreateUserRepository(UserModel, {
  async findDuplicate(dto: Omit<UserDocument, '_id'>) {
    const self = this as InstanceType<ReturnType<typeof CreateUserRepository>>;
    const { email } = dto;
    const [existingUser] = await self.find({
      pagination: { limit: 1 },
      where: { email },
    });

    return existingUser;
  },
});

export class UserService extends UserRepository {
  register = async (form: userSchema.RegistrationFormInput) => {
    const existingUser = await this.findDuplicate(form);
    if (existingUser) return { unavailableAttributesKeys: ['email'] };
    const password = await helpers.getHashedPassword(form.password);
    const { confirmPassword, ...userToRegister } = form;
    const userTobeCreated = { ...userToRegister, password };
    return this.createOne(userTobeCreated);
  };

  edit = async (id: string, form: userSchema.EditFormInput) => {
    const existingUser = await this.findDuplicate(form);
    if (existingUser) return { unavailableAttributesKeys: ['email'] };
    return this.updateOne(id, form);
  };

  login = async (
    loginCredentials: userSchema.LoginCredentialsInput,
    sessionOptions: types.SessionTokenOptions
  ) => {
    const [retrivedUser] = await this.find({
      pagination: { limit: 1 },
      where: { email: loginCredentials.email },
    });

    if (retrivedUser === null) return null;

    const isVerified = await helpers.isMatchingPasswords(
      loginCredentials.password,
      retrivedUser.password
    );

    if (!isVerified) {
      return {
        invalidCredentials: {
          label: 'password',
          value: loginCredentials.password,
          reason: 'incorrect',
        },
      };
    }

    const { accessExpiresIn, refreshExpiresIn } = sessionOptions;

    const createdAccessToken = helpers.LOGIN_SESSION.generateAccessJwt({
      payload: {
        userId: retrivedUser._id.toString(),
        isSuspended: retrivedUser.isSuspended,
        assignedRolesIds: retrivedUser.assignedRolesIds.map((id) =>
          id.toString()
        ),
      } as userSchema.LoginSessionTokenPayloadInput,
      expiresIn: accessExpiresIn,
    });

    const createdRefreshToken = helpers.LOGIN_SESSION.generateRefreshJwt({
      expiresIn: refreshExpiresIn,
    });

    const createdSession = await loginSessionService.open({
      subject: helpers.LOGIN_SESSION.subject,
      clientId: retrivedUser._id.toString(),
      accessToken: createdAccessToken,
      refreshToken: createdRefreshToken,
    });

    if ('alreadyOpened' in createdSession) return createdSession;
    return { createdAccessToken, createdRefreshToken };
  };

  logout = async (accessToken: string) => {
    const { packet } = helpers.LOGIN_SESSION.verifyAccessJwt(accessToken);
    return loginSessionService.close({
      subject: helpers.LOGIN_SESSION.subject,
      clientId: packet.userId.toString(),
      accessToken,
    });
  };

  keepLoggedIn = async (
    sessionOptions: { currentRefreshToken: string } & types.SessionTokenOptions
  ) => {
    const { currentRefreshToken, accessExpiresIn, refreshExpiresIn } =
      sessionOptions;

    const { LOGIN_SESSION } = helpers;
    const { packet } = LOGIN_SESSION.verifyRefreshJwt(currentRefreshToken);
    const createdAccessToken = LOGIN_SESSION.generateAccessJwt({
      payload: packet,
      expiresIn: accessExpiresIn,
    });

    const createdRefreshToken = LOGIN_SESSION.generateRefreshJwt({
      expiresIn: refreshExpiresIn,
    });

    const updatedSession = await loginSessionService.keep({
      currentRefreshToken,
      subject: LOGIN_SESSION.subject,
      clientId: packet.userId.toString(),
      accessToken: createdAccessToken,
      refreshToken: createdRefreshToken,
    });

    if (!Array.isArray(updatedSession)) return updatedSession;

    if (arrayUtils.isEmptyArray(updatedSession)) {
      return { currentRefreshToken };
    }

    return { createdAccessToken, createdRefreshToken };
  };

  getLoggedIn = async (accessToken: string) => {
    const { packet } = helpers.LOGIN_SESSION.verifyAccessJwt(accessToken);
    const loginSession = loginSessionService.get({
      clientId: packet.userId.toString(),
      subject: helpers.LOGIN_SESSION.subject,
      accessToken,
    });

    if (loginSession === null) return null;
    return packet;
  };

  getPasswordChangeTicket = async (
    form: Pick<UserDocument, 'email'>,
    ticketOptions: types.PasswordChangeTicketOptions
  ) => {
    const { email } = form;
    const [retrivedUser] = await this.find({
      pagination: { limit: 1 },
      where: { email },
    });

    if (retrivedUser === null) return null;
    return helpers.getPasswordChangeTicket(retrivedUser, ticketOptions);
  };

  changePassword = async (
    form: userSchema.PasswordChangeExecutionInput,
    ticket: types.PasswordChangeTicket
  ) => {
    const userToBeModified = await this.getOne(ticket.userId);
    if (!userToBeModified) return null;

    const verifiedTicket = helpers.verifyPasswordChangeTicket(
      userToBeModified,
      ticket
    );

    const { newPassword } = form;
    userToBeModified.password = await helpers.getHashedPassword(newPassword);
    return this.updateOne(verifiedTicket.userId, userToBeModified);
  };
}
