import * as httpStatus from 'src/common/plugins/http/http-status';
import { HttpErrorResponseFormatter } from 'src/common/plugins/http/http-error-formatter';
import { HttpError } from '.';

// 401 - Unauthorized

const statusCode = 401;

class UnauthorizedError extends HttpError {
  constructor(
    message: HttpError['message'],
    issues: HttpError['issues'],
    cause: HttpError['cause']
  ) {
    super(message, 'UnauthorizedHttpError', statusCode, issues, cause, {
      shouldExposeIssues: true,
    });
  }
}

export const UnauthorizedErrorBuilder = () => {
  return new HttpErrorResponseFormatter({
    statusCode,
    issueCodeAliasToValueDict: {
      unauthorized: 'unauthorized',
      unrecognized: 'auth-header-content-invalid',
      required: 'required',
      expired: 'expired',
      invaid: 'invaid',
      inActive: 'in-active',
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
      throw new UnauthorizedError(message, issues, cause);
    },
  });
};
