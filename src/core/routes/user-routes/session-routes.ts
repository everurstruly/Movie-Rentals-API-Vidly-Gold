import * as userSchema from 'src/core/schema/user-schema';
import * as userController from 'src/core/controllers/user-controller';
import { Router } from 'express';
import { validateResourceInput } from 'src/core/middleware/validation/request-schema-validator';

export const sessionRouter = Router();

sessionRouter
  .route('/sessions')
  .get(userController.keepUserLoggedIn)
  .post(
    [
      validateResourceInput({
        validationName: 'userLoginCredentials',
        schemaToMatch: userSchema.LoginCredentialsSchema,
      }),
    ],
    userController.loginUser
  )
  .delete(userController.logoutUser);
