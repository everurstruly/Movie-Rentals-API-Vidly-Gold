import * as httpStatus from 'src/common/plugins/http/http-status';
import { HttpError } from '.';
import { HttpErrorResponseFormatter } from 'src/common/plugins/http/http-error-formatter';

// 502 - Bad Gateway

const statusCode = 502;

class BadGatewayError extends HttpError {
  constructor(
    message: HttpError['message'],
    issues: HttpError['issues'],
    cause: HttpError['cause']
  ) {
    super(message, 'BadGatewayHttpError', statusCode, issues, cause, {
      shouldExposeIssues: true,
    });
  }
}

export const BadGatewayErrorBuilder = () =>
  new HttpErrorResponseFormatter({
    statusCode,
    issueCodeAliasToValueDict: {
      invalidResponse: 'invalid_response',
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
      throw new BadGatewayError(message, issues, cause);
    },
  });
