import * as userSchema from 'src/core/schema/user-schema';
import * as userController from 'src/core/controllers/user-controller';
import { Router } from 'express';
import { validateResourceInput } from 'src/core/middleware/validation/request-schema-validator';
import { placeholderRouteHanlder } from 'src/common/plugins/express/api-prototyping';

export const instanceRouter = Router();

instanceRouter
  .route('/')
  .get(userController.getUser)
  .patch(
    [
      validateResourceInput({
        schemaToMatch: userSchema.EditFormSchema,
      }),
    ],
    userController.editUser
  )
  .delete(userController.deleteUser);

instanceRouter.route('/password-change').patch(
  [
    validateResourceInput({
      schemaToMatch: userSchema.PasswordChangeExecutionFormSchema,
    }),
  ],
  placeholderRouteHanlder('resetPassword')
);

instanceRouter
  .route('/email-change')
  .get(placeholderRouteHanlder('get OTP'))
  .put(placeholderRouteHanlder('change email'));
