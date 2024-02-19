import asyncMiddleware from '../shared/async-middleware';

export const requestLocalsInitializer = () => {
  return asyncMiddleware(async (req, res, next) => {
    req.locals = {
      jwtVerification: {},
      resourceValidation: {},
      objectIdParamsValidation: {},
    };

    return next();
  });
};
