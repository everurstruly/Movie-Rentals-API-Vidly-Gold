import * as userController from 'src/core/controllers/user-controller';
import { Router } from 'express';
import { placeholderRouteHanlder } from 'src/common/plugins/express/api-prototyping';

export const meRouter = Router();

meRouter
  .route('/')
  .get(userController.redirectWithCurrentUserAsTargetedUser)
  .patch(userController.redirectWithCurrentUserAsTargetedUser)
  .delete(userController.redirectWithCurrentUserAsTargetedUser);

meRouter
  .route('/email-change')
  .get(placeholderRouteHanlder('get OTP'))
  .put(placeholderRouteHanlder('change email'));

meRouter
  .route('/password-change')
  .patch(placeholderRouteHanlder('reset current user password'));
