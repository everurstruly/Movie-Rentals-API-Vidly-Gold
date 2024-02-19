import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { UnauthorizedErrorBuilder } from 'src/storage/http-errors';

export const jwtErrorsToHttpErrorsTransformer = () => {
  return (error: any, req: Request, res: Response, next: NextFunction) => {
    if (!(error instanceof jwt.JsonWebTokenError)) next(error);

    const verificationError = UnauthorizedErrorBuilder();

    if (error instanceof jwt.TokenExpiredError) {
      verificationError.use({
        message: 'token expired',
      });
    }

    if (error instanceof jwt.NotBeforeError) {
      verificationError.use({
        message: 'support for token-utilization is discontinued',
      });
    }

    verificationError.use({
      message: 'possibly malformed or contains invalid details',
    });
  };
};
