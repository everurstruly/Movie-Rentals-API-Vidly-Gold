export type HttpErrorIssues = {
  code: string;
  reason: string;
  value?: any;
  source?: { parameter: string } | { header: string } | { content: string };
}[];

export interface HttpErrorJSON {
  name: string;
  statusCode: number;
  message: string;
  issues: HttpError['issues'] | null;
}

export interface HttpErrorOptions {
  shouldExposeIssues: boolean;
}

export class HttpError extends global.Error {
  name;
  statusCode;
  message;
  cause;
  issues;
  options;

  constructor(
    message: string,
    name: string,
    statusCode: number,
    issues: HttpErrorIssues | null,
    cause: globalThis.Error | null,
    options: HttpErrorOptions
  ) {
    super(message);
    this.name = name;
    this.message = message;
    this.statusCode = statusCode;
    this.cause = cause;
    this.issues = issues;
    this.options = options;
  }

  toJSON = (
    options = {
      space: 2,
    }
  ) => {
    const infoInJson: HttpErrorJSON = {
      name: this.name,
      statusCode: this.statusCode,
      message: this.message,
      issues: this.issues,
    };

    for (const key of Object.keys(infoInJson)) {
      if ((infoInJson as any)[key] === undefined) {
        delete (infoInJson as any)[key];
      }
    }

    return JSON.stringify(infoInJson, null, options.space);
  };
}

export * from './bad-gateway-error';
export * from './bad-request-error';
export * from './conflict-error';
export * from './forbidden-error';
export * from './gone-error';
export * from './internal-server-error';
export * from './length-required-error';
export * from './method-not-allowed-error';
export * from './not-acceptable-error';
export * from './not-found-error';
export * from './not-implemented-error';
export * from './payment-required-error';
export * from './precondition-failed-error';
export * from './service-unavailable-error';
export * from './timeout-error';
export * from './too-many-requests-error';
export * from './unauthorized-error';
export * from './unprocessable-error';
