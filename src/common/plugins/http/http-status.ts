import httpStatus from 'http-status';
import * as objliteralUtils from 'src/common/utils/datatype/object-literal-utils';

export const STATUS_NAME_TO_CODE_DICT = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  OK: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  IMUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  URITooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HTTPVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  BandwidthLimitExceeded: 509,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
} as const;

export const STATUS_NAME = objliteralUtils.objectKeys(STATUS_NAME_TO_CODE_DICT);

export type StatusName = typeof STATUS_NAME[number];
export type StatusCode = typeof STATUS_NAME_TO_CODE_DICT[StatusName];
export type StatusCodeClass = '1xx' | '2xx' | '3xx' | '4xx' | '5xx';

export const getStatusCode = (name: StatusName) => {
  return STATUS_NAME_TO_CODE_DICT[name];
};

export const getStatusCodePhrase = (code: number) => {
  const phrase = httpStatus[code];
  if (typeof phrase === 'string' || typeof phrase === 'undefined') {
    return phrase;
  }
};

export const getStatusCodeMessage = (code: number) => {
  const msg = httpStatus[`${code}_MESSAGE`];
  if (typeof msg === 'string' || typeof msg === 'undefined') {
    return msg;
  }
};

const getStatusCodeClass = (code: number) => {
  const codeClass = httpStatus[`${code}_CLASS`];
  if (typeof codeClass === 'string') {
    return codeClass as StatusCodeClass;
  }
};

export const extractStatusCodeTypeDetail = (code: number) => {
  return {
    codeClass: getStatusCodeClass(code),
    isInformational() {
      return this.codeClass === '1xx';
    },
    isSuccessful() {
      return this.codeClass === '2xx';
    },
    isRedirection() {
      return this.codeClass === '3xx';
    },
    isClientError() {
      return this.codeClass === '4xx';
    },
    isServerError() {
      return this.codeClass === '5xx';
    },
  };
};
