import * as httpStatus from 'src/common/plugins/http/http-status';
import { HttpError } from '.';
import { HttpErrorResponseFormatter } from 'src/common/plugins/http/http-error-formatter';

const statusCode = 422;

class UnprocessableError extends HttpError {
  constructor(
    message: HttpError['message'],
    issues: HttpError['issues'],
    cause: HttpError['cause']
  ) {
    super(message, 'UnprocessableHttpError', statusCode, issues, cause, {
shouldExposeIssues: true 
});
  }
}

export const UnprocessableErrorBuilder = () =>
  new HttpErrorResponseFormatter({
    statusCode,
    issueCodeAliasToValueDict: {
      forbidden: 'forbidden',
      unknownAuth: 'unknownAuth',
      sslRequired: 'sslRequired',
      accountDeleted: 'accountDeleted',
      accountDisabled: 'accountDisabled',
      accountUnverified: 'accountUnverified',
      countryBlocked: 'countryBlocked',
      accessNotConfigured: 'accessNotConfigured',
      policyNotMet: 'policyNotMet',
      quotaExceeded: 'quotaExceeded',
      rateLitmitExceeded: 'rateLitmitExceeded',
      concurrentLimitExceeded: 'concurrentLimitExceeded',
      insufficientPersmission: 'insufficientPersmission',
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
      throw new UnprocessableError(message, issues, cause);
    },
  });
