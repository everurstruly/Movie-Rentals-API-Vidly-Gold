import { setPreEnvironment } from './startup/environment';
setPreEnvironment();

import express from 'express';
import * as mainConfigUtils from 'config/utils';
import { startServer } from './startup/server';
import { startupDb } from 'src/startup/database';
import { mountRoutes } from 'src/startup/routes';
import {
  mountPostRouteMiddlewares,
  mountPreRouteMiddlewares,
} from './startup/middleware';

(async function startApp() {
  const app = express();
  let dbConnection;
  try {
    dbConnection = await startupDb();
    console.log('/info/ Connection to Database secured!');

    await mountPreRouteMiddlewares(app);
    console.log('/info/ Pre-route Middlewares mounted!');

    // await mountRoutes(app);
    // console.log('/info/ Server Routes loaded!');

    await mountPostRouteMiddlewares(app);
    console.log('/info/ Post-route Middlewares mounted!');

    await startServer(app);
    console.log(
      '/info/ Server live at: ',
      `"${mainConfigUtils.getServerUrl()}"`
    );
  } catch (error: any) {
    // console.log('/error/ Starting App: ', error.name, error.message);
    dbConnection?.disconnect();
  }
})();
