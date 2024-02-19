import { Request, Response, NextFunction } from 'express';
import { BadRequestErrorBuilder } from 'src/core/errors/http-errors';

const isInstanceOfUnexpectedJsonBody = (error: any) => {
  const { message } = error;
  return (
    message &&
    message.indexOf('Unexpected') > -1 &&
    message.indexOf('JSON') > -1
  );
};

export const requestErrorsToHttpErrorsTransformer = () => {
  return (error: any, req: Request, res: Response, next: NextFunction) => {
    if (isInstanceOfUnexpectedJsonBody(error)) {
      BadRequestErrorBuilder()
        .addIssues((iss) => {
          return iss.invalidSyntax({
            source: { content: 'body' },
            reason: error.message,
          });
        })
        .use();
    }
  };
};
