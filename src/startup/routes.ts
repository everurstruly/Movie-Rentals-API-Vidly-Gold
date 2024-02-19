import { Express } from 'express';
import { getAsApiRoute } from 'config/utils';
import { userRouter } from 'src/core/routes/user-routes';
import { serverHealthRouter } from 'src/core/routes/server-health-routes';

export const mountRoutes = async (app: Express): Promise<void> => {
  app.use(getAsApiRoute('/users'), userRouter);
  app.use('*/server-health', serverHealthRouter);
};
