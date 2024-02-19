import { Express } from 'express';
import mainConfig from 'config';

export const startServer = (app: Express) => {
  return new Promise((resolve, reject) => {
    app.listen(mainConfig.get('server.port'), () => resolve(undefined));
  });
};
