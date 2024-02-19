import * as userSchema from 'src/core/schema/user-schema';
import * as userController from 'src/core/controllers/user-controller';
import { meRouter } from './me-routes';
import { sessionRouter } from './session-routes';
import { instanceRouter } from './instance-routes';
import { Router } from 'express';
import { validateResourceInput } from 'src/core/middleware/validation/request-schema-validator';
import { validateObjectIdParam } from 'src/core/middleware/validation/objectid-param-validator';
import { placeholderRouteHanlder } from 'src/common/plugins/express/api-prototyping';

export const userRouter = Router();

userRouter
  .route('/')
  .get(userController.getUsers)
  .post(
    [
      validateResourceInput({
        schemaToMatch: userSchema.RegistrationFormSchema,
      }),
    ],
    userController.registerUser
  );

userRouter.route('/forgot-password').post(
  [
    validateResourceInput({
      schemaToMatch: userSchema.PasswordChangeAppealFormSchema,
    }),
  ],
  placeholderRouteHanlder('appeal for password retrival')
);

userRouter.use('/me', meRouter);

userRouter.use('/sessions', sessionRouter);

userRouter.use(
  '/:userId',
  [
    validateObjectIdParam({
      doThrowValidationErrorOnParams: ['userId'],
    }),
  ],
  instanceRouter
);
