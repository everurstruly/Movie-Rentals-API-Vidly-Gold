import express from 'express';
import cookieParser from 'cookie-parser';
import { jwtErrorWrapper } from 'src/core/middleware/proj/jwt-error-wrapper';
import { requestLocalsInitializer } from '@/src/core/middleware/proj/request-locals-init';
import { httpResponseFormatter } from 'src/core/middleware/proj/http-response-formatter';
import { resourceNotFound } from '@/src/core/middleware/proj/resource-not-found';
import { dataCurationQueryParser } from '@/src/core/middleware/proj/data-curation-query-parser';
import { corsEnforcer } from 'src/core/middleware/security/cors-enforcer';
import { requestLogger } from 'src/core/middleware/logging/request-logger';
import { errorLogger } from 'src/core/middleware/logging/error-logger';
import { requestRateLimiter } from 'src/core/middleware/security/request-rate-limiter';
import { errorHandlers } from '../core/middleware/error-handling';

export const mountPreRouteMiddlewares = async (app: express.Express) => {
  app.use(requestLogger());
  app.use(corsEnforcer());
  app.use(requestRateLimiter());
  app.use(requestLocalsInitializer());
  app.use(httpResponseFormatter());
  app.use(dataCurationQueryParser());
  app.use(cookieParser());
  app.use(jwtErrorWrapper());
  app.use(express.json());
};

export const mountPostRouteMiddlewares = async (app: express.Express) => {
  app.use(resourceNotFound());
  app.use(
    errorHandlers({
      attachUnexpectedErrorLogger: async () => errorLogger(),
    })
  );
};
