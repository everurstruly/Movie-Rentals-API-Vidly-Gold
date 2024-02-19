import { Request, Response, NextFunction } from 'express';
import { HttpError, HttpErrorJSON } from '../../errors/http-errors';
import { requestErrorsToHttpErrorsTransformer } from './request-errors-transformer';
import { jwtErrorsToHttpErrorsTransformer } from './jwt-errors-transformer';
import { corsErrorsHandler } from './security-errors-handlers';

const defaultOptions = {
  attachExpectedErrorLogger: async (
    error: any,
    req: Request,
    res: Response
  ): Promise<any> => void 0,

  attachUnexpectedErrorLogger: async (
    error: any,
    req: Request,
    res: Response
  ): Promise<any> => void 0,
};

export const errorHandlers = (options: Partial<typeof defaultOptions> = {}) => {
  const { attachUnexpectedErrorLogger } = { ...defaultOptions, ...options };

  return [
    corsErrorsHandler(),

    requestErrorsToHttpErrorsTransformer(),

    jwtErrorsToHttpErrorsTransformer(),

    // HttpErrorsHandler
    (error: any, req: Request, res: Response, next: NextFunction) => {
      if (!(error instanceof HttpError)) next(error);

      const { statusCode, message, options } = error;
      const issues = !options.shouldExposeIssues ? undefined : error.issues;
      res.status(statusCode).json({ statusCode, message, issues });
    },

    // AllErrosHandler - catch-all
    async (error: any, req: Request, res: Response, next: NextFunction) => {
      await attachUnexpectedErrorLogger(error, req, res);

      res.status(500).json({
        statusCode: 500,
        message: `An unexpected error occured.`,
      } as HttpErrorJSON);
    },
  ];
};
