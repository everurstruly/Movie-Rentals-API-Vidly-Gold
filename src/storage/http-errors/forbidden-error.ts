import * as httpStatus from 'src/common/plugins/http/http-status';
import { HttpError } from '.';
import { HttpErrorResponseFormatter } from 'src/common/plugins/http/http-error-formatter';

// 403 - Forbidden;

const statusCode = 403;

class ForbiddenError extends HttpError {
  constructor(
    message: HttpError['message'],
    issues: HttpError['issues'],
    cause: HttpError['cause']
  ) {
    super(message, 'ForbiddenHttpError', statusCode, issues, cause, {
      shouldExposeIssues: true,
    });
  }
}

export const ForbiddenErrorBuilder = () =>
  new HttpErrorResponseFormatter({
    statusCode,
    issueCodeAliasToValueDict: {
      forbidden: 'forbidden',
      alreadyExists: 'already-exists',
      unknownSyntax: 'unknownSyntax',
      sslRequired: 'sslRequired',
      accessNotConfigured: 'accessNotConfigured',
      accountDeleted: 'accountDeleted',
      accountDisabled: 'accountDisabled',
      accountUnverified: 'accountUnverified',
      countryBlocked: 'countryBlocked',
      policyNotMet: 'policyNotMet',
      quotaExceeded: 'quotaExceeded',
      rateLitmitExceeded: 'rateLitmitExceeded',
      concurrentLimitExceeded: 'concurrentLimitExceeded',
      downloadServiceForbidden: 'download-service-forbidden',
      insufficientPersmission: 'insufficientPersmission',
      insufficientAuthorizedParty: 'insufficient-auth-party',
      responseTooLarge: 'response-too-large',
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
      throw new ForbiddenError(message, issues, cause);
    },
  });
