import * as httpStatus from 'src/common/plugins/http/http-status';
import { HttpError } from '.';
import { HttpErrorResponseFormatter } from 'src/common/plugins/http/http-error-formatter';

// 400 - Bad Request;

const statusCode = 400;

class BadRequestError extends HttpError {
  constructor(
    message: HttpError['message'],
    issues: HttpError['issues'],
    cause: HttpError['cause']
  ) {
    super(message, 'BadRequestHttpError', statusCode, issues, cause, {
      shouldExposeIssues: true,
    });
  }
}

export const BadRequestErrorBuilder = () =>
  new HttpErrorResponseFormatter({
    statusCode,
    issueCodeAliasToValueDict: {
      missing: 'missing',
      tooSmall: 'too_small',
      tooBig: 'too_big',
      unrecognized: 'unrecognized',
      badContent: 'bad_content',
      unknownSyntax: 'unknown_syntax',
      invalidSyntax: 'invalid_syntax',
      invalidKey: 'invalid_key',
      invalidType: 'invalid_type',
      invalidArgument: 'invalid_argument',
      invalidParameter: 'invalid_parameter',
      invalidQuery: 'invalid_query',
      invalidHeader: 'invalid_header',
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
      throw new BadRequestError(message, issues, cause);
    },
  });
