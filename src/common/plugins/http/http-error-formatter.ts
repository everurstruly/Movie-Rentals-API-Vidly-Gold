import * as objliteralUtils from 'src/common/utils/datatype/object-literal-utils';

export type ErrorIssue<ErrorCode extends string | number> = {
  code: ErrorCode;
  reason: string;
  value?: any;
  source?: { parameter: string } | { header: string } | { content: string };
};

export type ErrorResponse<ErrorCode extends string | number> = {
  statusCode: number;
  message?: string;
  issues?: ErrorIssue<ErrorCode>[];
  meta: Record<string, any>;
};

export type ErrorMessageContext = {
  statusCode: number;
  resourceName?: string;
  message?: string;
};

export class HttpErrorResponseFormatter<
  ErrorCodeAlias extends string,
  ErrorCode extends string | number
> {
  issues: ErrorResponse<ErrorCode>['issues'];
  messageContext: Omit<ErrorMessageContext, 'statusCode'> = {};
  meta: Record<string, any> = {};

  statusCode;
  issueCodeAliasToValueDict;

  addIssues;
  useFormatting;
  buildMessage;

  constructor(options: {
    statusCode: number;
    issueCodeAliasToValueDict: Readonly<Record<ErrorCodeAlias, ErrorCode>>;
    buildMessage: (context: ErrorMessageContext) => string | undefined;
    useFormatting: (formatting: ErrorResponse<ErrorCode>, cause: any) => any;
  }) {
    const {
      statusCode,
      issueCodeAliasToValueDict,
      useFormatting,
      buildMessage,
    } = options;

    this.statusCode = statusCode;
    this.issueCodeAliasToValueDict = issueCodeAliasToValueDict;
    this.useFormatting = useFormatting;
    this.buildMessage = buildMessage;

    const createIssueFormatter = (code: ErrorCode) => {
      return (
        ...issues: WithOptional<Omit<ErrorIssue<ErrorCode>, 'code'>, 'source'>[]
      ) => {
        return issues.flatMap((iss) => {
          return { code, ...iss };
        });
      };
    };

    const _issuesFormatter = {
      ...objliteralUtils
        .objectKeys(issueCodeAliasToValueDict)
        .reduce((formatters, alias) => {
          formatters[alias] = createIssueFormatter(
            issueCodeAliasToValueDict[alias]
          );

          return formatters;
        }, {} as Record<keyof typeof issueCodeAliasToValueDict, ReturnType<typeof createIssueFormatter>>),
    };

    type CreateIssues = (
      issueFormatter: typeof _issuesFormatter
    ) => ReturnType<typeof _issuesFormatter[ErrorCodeAlias]>;

    this.addIssues = (createIssues: CreateIssues | typeof this.issues) => {
      if (typeof this.issues !== 'function') {
        this.issues = createIssues as typeof this.issues;
        return this;
      }

      const createdIssues = (createIssues as CreateIssues)(_issuesFormatter);
      if (typeof this.issues === 'undefined') {
        this.issues = createdIssues;
        return this;
      }

      this.issues = [...this.issues, ...createdIssues];
      return this;
    };
  }

  addMeta = (data: ErrorResponse<ErrorCode>['meta']) => {
    this.meta = data;
    return this;
  };

  use = (
    context: Omit<ErrorMessageContext, 'statusCode'> = {},
    cause: any = null
  ) => {
    const { statusCode, issues, meta } = this;
    const message = this.buildMessage({ statusCode, ...context });
    return this.useFormatting({ statusCode, message, issues, meta }, cause);
  };
}
