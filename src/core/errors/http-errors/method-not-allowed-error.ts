import * as httpStatus from 'src/common/plugins/http/http-status';
import { HttpError } from '.';
import { HttpErrorResponseFormatter } from 'src/common/plugins/http/http-error-formatter';

// 405 - Method Not Allowed

const statusCode = 405;

class MethodNotAllowedError extends HttpError {
  constructor(
    message: HttpError['message'],
    issues: HttpError['issues'],
    cause: HttpError['cause']
  ) {
    super(message, 'MethodNotAllowedHttpError', statusCode, issues, cause, {
shouldExposeIssues: true 
});
  }
}

export const MethodNotAllowedErrorBuilder = () =>
  new HttpErrorResponseFormatter({
    statusCode,
    issueCodeAliasToValueDict: {
      httpMethodNotAllowed: 'http-method-not-allowed',
    } as const,
    buildMessage: (context) => {
      const { statusCode, resourceName, message } = context;
      const statusPhrase = httpStatus.getStatusCodePhrase(statusCode);
      if (message) return message;
      if (resourceName) return `${resourceName} ${statusPhrase}`;
      return httpStatus.getStatusCodeMessage(statusCode);
    },
    useFormatting: (formatting, cause) => {
      const { message = '', issues = null } = formatting;
      throw new MethodNotAllowedError(message, issues, cause);
    },
  });
