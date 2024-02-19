import * as helpers from './responders-helpers';
import { Request, Response } from 'express';
import { HttpDataResponseFormatter } from 'src/common/plugins/http/http-data-formatter';

const buildFormatters = (request: any, response: any) => {
  const httpCtx = { request, response };
  return {
    Continue: new HttpDataResponseFormatter({
      statusCode: 100,
      buildMessage: (msgCtx) => helpers.defaultMessageBuild(msgCtx),
      buildLinks: (meta) => {
        if (typeof meta === 'undefined') return undefined;
        const { pagination } = meta;

        const self = '/home';
        const related = null;

        if (typeof pagination === 'undefined') {
          return { self, related };
        }

        const { pageNumber, pageItemsSize, totalPages } = pagination;
        const first = helpers.getLinkForPageNumber(pageItemsSize)(0);
        const last = helpers.getLinkForPageNumber(pageItemsSize)(totalPages);
        const prev = helpers.getLinkForPageNumber(pageItemsSize)(
          Math.max(0, pageNumber - 1)
        );
        const next = helpers.getLinkForPageNumber(pageItemsSize)(
          Math.min(totalPages, pageNumber + 1)
        );

        return { self, first, last, prev, next, related };
      },
      useFormatting: (formatting) => {
        const { statusCode } = formatting;
        return httpCtx.response.status(statusCode).json(formatting);
      },
    }),

    SwitchingProtocols: new HttpDataResponseFormatter({
      statusCode: 101,
      buildMessage: (msgCtx) => helpers.defaultMessageBuild(msgCtx),
      buildLinks: (meta) => {
        if (typeof meta === 'undefined') return undefined;
        const { pagination } = meta;

        const self = '/home';
        const related = null;

        if (typeof pagination === 'undefined') {
          return { self, related };
        }

        const { pageNumber, pageItemsSize, totalPages } = pagination;
        const first = helpers.getLinkForPageNumber(pageItemsSize)(0);
        const last = helpers.getLinkForPageNumber(pageItemsSize)(totalPages);
        const prev = helpers.getLinkForPageNumber(pageItemsSize)(
          Math.max(0, pageNumber - 1)
        );
        const next = helpers.getLinkForPageNumber(pageItemsSize)(
          Math.min(totalPages, pageNumber + 1)
        );

        return { self, first, last, prev, next, related };
      },
      useFormatting: (formatting) => {
        const { statusCode } = formatting;
        return httpCtx.response.status(statusCode).json(formatting);
      },
    }),

    Processing: new HttpDataResponseFormatter({
      statusCode: 102,
      buildMessage: (msgCtx) => helpers.defaultMessageBuild(msgCtx),
      buildLinks: (meta) => {
        if (typeof meta === 'undefined') return undefined;
        const { pagination } = meta;

        const self = '/home';
        const related = null;

        if (typeof pagination === 'undefined') {
          return { self, related };
        }

        const { pageNumber, pageItemsSize, totalPages } = pagination;
        const first = helpers.getLinkForPageNumber(pageItemsSize)(0);
        const last = helpers.getLinkForPageNumber(pageItemsSize)(totalPages);
        const prev = helpers.getLinkForPageNumber(pageItemsSize)(
          Math.max(0, pageNumber - 1)
        );
        const next = helpers.getLinkForPageNumber(pageItemsSize)(
          Math.min(totalPages, pageNumber + 1)
        );

        return { self, first, last, prev, next, related };
      },
      useFormatting: (formatting) => {
        const { statusCode } = formatting;
        return httpCtx.response.status(statusCode).json(formatting);
      },
    }),

    EarlyHints: new HttpDataResponseFormatter({
      statusCode: 103,
      buildMessage: (msgCtx) => helpers.defaultMessageBuild(msgCtx),
      buildLinks: (meta) => {
        if (typeof meta === 'undefined') return undefined;
        const { pagination } = meta;

        const self = '/home';
        const related = null;

        if (typeof pagination === 'undefined') {
          return { self, related };
        }

        const { pageNumber, pageItemsSize, totalPages } = pagination;
        const first = helpers.getLinkForPageNumber(pageItemsSize)(0);
        const last = helpers.getLinkForPageNumber(pageItemsSize)(totalPages);
        const prev = helpers.getLinkForPageNumber(pageItemsSize)(
          Math.max(0, pageNumber - 1)
        );
        const next = helpers.getLinkForPageNumber(pageItemsSize)(
          Math.min(totalPages, pageNumber + 1)
        );

        return { self, first, last, prev, next, related };
      },
      useFormatting: (formatting) => {
        const { statusCode } = formatting;
        return httpCtx.response.status(statusCode).json(formatting);
      },
    }),

    OK: new HttpDataResponseFormatter({
      statusCode: 200,
      buildMessage: (msgCtx) => helpers.defaultMessageBuild(msgCtx),
      buildLinks: (meta) => {
        if (typeof meta === 'undefined') return undefined;
        const { pagination } = meta;

        const self = '/home';
        const related = null;

        if (typeof pagination === 'undefined') {
          return { self, related };
        }

        const { pageNumber, pageItemsSize, totalPages } = pagination;
        const first = helpers.getLinkForPageNumber(pageItemsSize)(0);
        const last = helpers.getLinkForPageNumber(pageItemsSize)(totalPages);
        const prev = helpers.getLinkForPageNumber(pageItemsSize)(
          Math.max(0, pageNumber - 1)
        );
        const next = helpers.getLinkForPageNumber(pageItemsSize)(
          Math.min(totalPages, pageNumber + 1)
        );

        return { self, first, last, prev, next, related };
      },
      useFormatting: (formatting) => {
        const { statusCode } = formatting;
        return httpCtx.response.status(statusCode).json(formatting);
      },
    }),

    Created: new HttpDataResponseFormatter({
      statusCode: 201,
      buildMessage: (msgCtx) => helpers.defaultMessageBuild(msgCtx),
      buildLinks: (meta) => {
        if (typeof meta === 'undefined') return undefined;
        const { pagination } = meta;

        const self = '/home';
        const related = null;

        if (typeof pagination === 'undefined') {
          return { self, related };
        }

        const { pageNumber, pageItemsSize, totalPages } = pagination;
        const first = helpers.getLinkForPageNumber(pageItemsSize)(0);
        const last = helpers.getLinkForPageNumber(pageItemsSize)(totalPages);
        const prev = helpers.getLinkForPageNumber(pageItemsSize)(
          Math.max(0, pageNumber - 1)
        );
        const next = helpers.getLinkForPageNumber(pageItemsSize)(
          Math.min(totalPages, pageNumber + 1)
        );

        return { self, first, last, prev, next, related };
      },
      useFormatting: (formatting) => {
        const { statusCode } = formatting;
        return httpCtx.response.status(statusCode).json(formatting);
      },
    }),

    Accepted: new HttpDataResponseFormatter({
      statusCode: 202,
      buildMessage: (msgCtx) => helpers.defaultMessageBuild(msgCtx),
      buildLinks: (meta) => {
        if (typeof meta === 'undefined') return undefined;
        const { pagination } = meta;

        const self = '/home';
        const related = null;

        if (typeof pagination === 'undefined') {
          return { self, related };
        }

        const { pageNumber, pageItemsSize, totalPages } = pagination;
        const first = helpers.getLinkForPageNumber(pageItemsSize)(0);
        const last = helpers.getLinkForPageNumber(pageItemsSize)(totalPages);
        const prev = helpers.getLinkForPageNumber(pageItemsSize)(
          Math.max(0, pageNumber - 1)
        );
        const next = helpers.getLinkForPageNumber(pageItemsSize)(
          Math.min(totalPages, pageNumber + 1)
        );

        return { self, first, last, prev, next, related };
      },
      useFormatting: (formatting) => {
        const { statusCode } = formatting;
        return httpCtx.response.status(statusCode).json(formatting);
      },
    }),

    NonAuthoritativeInformation: new HttpDataResponseFormatter({
      statusCode: 203,
      buildMessage: (msgCtx) => helpers.defaultMessageBuild(msgCtx),
      buildLinks: (meta) => {
        if (typeof meta === 'undefined') return undefined;
        const { pagination } = meta;

        const self = '/home';
        const related = null;

        if (typeof pagination === 'undefined') {
          return { self, related };
        }

        const { pageNumber, pageItemsSize, totalPages } = pagination;
        const first = helpers.getLinkForPageNumber(pageItemsSize)(0);
        const last = helpers.getLinkForPageNumber(pageItemsSize)(totalPages);
        const prev = helpers.getLinkForPageNumber(pageItemsSize)(
          Math.max(0, pageNumber - 1)
        );
        const next = helpers.getLinkForPageNumber(pageItemsSize)(
          Math.min(totalPages, pageNumber + 1)
        );

        return { self, first, last, prev, next, related };
      },
      useFormatting: (formatting) => {
        const { statusCode } = formatting;
        return httpCtx.response.status(statusCode).json(formatting);
      },
    }),

    NoContent: new HttpDataResponseFormatter({
      statusCode: 204,
      buildMessage: (msgCtx) => helpers.defaultMessageBuild(msgCtx),
      buildLinks: (meta) => {
        if (typeof meta === 'undefined') return undefined;
        const { pagination } = meta;

        const self = '/home';
        const related = null;

        if (typeof pagination === 'undefined') {
          return { self, related };
        }

        const { pageNumber, pageItemsSize, totalPages } = pagination;
        const first = helpers.getLinkForPageNumber(pageItemsSize)(0);
        const last = helpers.getLinkForPageNumber(pageItemsSize)(totalPages);
        const prev = helpers.getLinkForPageNumber(pageItemsSize)(
          Math.max(0, pageNumber - 1)
        );
        const next = helpers.getLinkForPageNumber(pageItemsSize)(
          Math.min(totalPages, pageNumber + 1)
        );

        return { self, first, last, prev, next, related };
      },
      useFormatting: (formatting) => {
        const { statusCode } = formatting;
        return httpCtx.response.status(statusCode).json(formatting);
      },
    }),

    ResetContent: new HttpDataResponseFormatter({
      statusCode: 205,
      buildMessage: (msgCtx) => helpers.defaultMessageBuild(msgCtx),
      buildLinks: (meta) => {
        if (typeof meta === 'undefined') return undefined;
        const { pagination } = meta;

        const self = '/home';
        const related = null;

        if (typeof pagination === 'undefined') {
          return { self, related };
        }

        const { pageNumber, pageItemsSize, totalPages } = pagination;
        const first = helpers.getLinkForPageNumber(pageItemsSize)(0);
        const last = helpers.getLinkForPageNumber(pageItemsSize)(totalPages);
        const prev = helpers.getLinkForPageNumber(pageItemsSize)(
          Math.max(0, pageNumber - 1)
        );
        const next = helpers.getLinkForPageNumber(pageItemsSize)(
          Math.min(totalPages, pageNumber + 1)
        );

        return { self, first, last, prev, next, related };
      },
      useFormatting: (formatting) => {
        const { statusCode } = formatting;
        return httpCtx.response.status(statusCode).json(formatting);
      },
    }),

    PartialContent: new HttpDataResponseFormatter({
      statusCode: 206,
      buildMessage: (msgCtx) => helpers.defaultMessageBuild(msgCtx),
      buildLinks: (meta) => {
        if (typeof meta === 'undefined') return undefined;
        const { pagination } = meta;

        const self = '/home';
        const related = null;

        if (typeof pagination === 'undefined') {
          return { self, related };
        }

        const { pageNumber, pageItemsSize, totalPages } = pagination;
        const first = helpers.getLinkForPageNumber(pageItemsSize)(0);
        const last = helpers.getLinkForPageNumber(pageItemsSize)(totalPages);
        const prev = helpers.getLinkForPageNumber(pageItemsSize)(
          Math.max(0, pageNumber - 1)
        );
        const next = helpers.getLinkForPageNumber(pageItemsSize)(
          Math.min(totalPages, pageNumber + 1)
        );

        return { self, first, last, prev, next, related };
      },
      useFormatting: (formatting) => {
        const { statusCode } = formatting;
        return httpCtx.response.status(statusCode).json(formatting);
      },
    }),

    MultiStatus: new HttpDataResponseFormatter({
      statusCode: 207,
      buildMessage: (msgCtx) => helpers.defaultMessageBuild(msgCtx),
      buildLinks: (meta) => {
        if (typeof meta === 'undefined') return undefined;
        const { pagination } = meta;

        const self = '/home';
        const related = null;

        if (typeof pagination === 'undefined') {
          return { self, related };
        }

        const { pageNumber, pageItemsSize, totalPages } = pagination;
        const first = helpers.getLinkForPageNumber(pageItemsSize)(0);
        const last = helpers.getLinkForPageNumber(pageItemsSize)(totalPages);
        const prev = helpers.getLinkForPageNumber(pageItemsSize)(
          Math.max(0, pageNumber - 1)
        );
        const next = helpers.getLinkForPageNumber(pageItemsSize)(
          Math.min(totalPages, pageNumber + 1)
        );

        return { self, first, last, prev, next, related };
      },
      useFormatting: (formatting) => {
        const { statusCode } = formatting;
        return httpCtx.response.status(statusCode).json(formatting);
      },
    }),

    AlreadyReported: new HttpDataResponseFormatter({
      statusCode: 208,
      buildMessage: (msgCtx) => helpers.defaultMessageBuild(msgCtx),
      buildLinks: (meta) => {
        if (typeof meta === 'undefined') return undefined;
        const { pagination } = meta;

        const self = '/home';
        const related = null;

        if (typeof pagination === 'undefined') {
          return { self, related };
        }

        const { pageNumber, pageItemsSize, totalPages } = pagination;
        const first = helpers.getLinkForPageNumber(pageItemsSize)(0);
        const last = helpers.getLinkForPageNumber(pageItemsSize)(totalPages);
        const prev = helpers.getLinkForPageNumber(pageItemsSize)(
          Math.max(0, pageNumber - 1)
        );
        const next = helpers.getLinkForPageNumber(pageItemsSize)(
          Math.min(totalPages, pageNumber + 1)
        );

        return { self, first, last, prev, next, related };
      },
      useFormatting: (formatting) => {
        const { statusCode } = formatting;
        return httpCtx.response.status(statusCode).json(formatting);
      },
    }),

    IMUsed: new HttpDataResponseFormatter({
      statusCode: 226,
      buildMessage: (msgCtx) => helpers.defaultMessageBuild(msgCtx),
      buildLinks: (meta) => {
        if (typeof meta === 'undefined') return undefined;
        const { pagination } = meta;

        const self = '/home';
        const related = null;

        if (typeof pagination === 'undefined') {
          return { self, related };
        }

        const { pageNumber, pageItemsSize, totalPages } = pagination;
        const first = helpers.getLinkForPageNumber(pageItemsSize)(0);
        const last = helpers.getLinkForPageNumber(pageItemsSize)(totalPages);
        const prev = helpers.getLinkForPageNumber(pageItemsSize)(
          Math.max(0, pageNumber - 1)
        );
        const next = helpers.getLinkForPageNumber(pageItemsSize)(
          Math.min(totalPages, pageNumber + 1)
        );

        return { self, first, last, prev, next, related };
      },
      useFormatting: (formatting) => {
        const { statusCode } = formatting;
        return httpCtx.response.status(statusCode).json(formatting);
      },
    }),

    MultipleChoices: new HttpDataResponseFormatter({
      statusCode: 300,
      buildMessage: (msgCtx) => helpers.defaultMessageBuild(msgCtx),
      buildLinks: (meta) => {
        if (typeof meta === 'undefined') return undefined;
        const { pagination } = meta;

        const self = '/home';
        const related = null;

        if (typeof pagination === 'undefined') {
          return { self, related };
        }

        const { pageNumber, pageItemsSize, totalPages } = pagination;
        const first = helpers.getLinkForPageNumber(pageItemsSize)(0);
        const last = helpers.getLinkForPageNumber(pageItemsSize)(totalPages);
        const prev = helpers.getLinkForPageNumber(pageItemsSize)(
          Math.max(0, pageNumber - 1)
        );
        const next = helpers.getLinkForPageNumber(pageItemsSize)(
          Math.min(totalPages, pageNumber + 1)
        );

        return { self, first, last, prev, next, related };
      },
      useFormatting: (formatting) => {
        const { statusCode } = formatting;
        return httpCtx.response.status(statusCode).json(formatting);
      },
    }),

    MovedPermanently: new HttpDataResponseFormatter({
      statusCode: 301,
      buildMessage: (msgCtx) => helpers.defaultMessageBuild(msgCtx),
      buildLinks: (meta) => {
        if (typeof meta === 'undefined') return undefined;
        const { pagination } = meta;

        const self = '/home';
        const related = null;

        if (typeof pagination === 'undefined') {
          return { self, related };
        }

        const { pageNumber, pageItemsSize, totalPages } = pagination;
        const first = helpers.getLinkForPageNumber(pageItemsSize)(0);
        const last = helpers.getLinkForPageNumber(pageItemsSize)(totalPages);
        const prev = helpers.getLinkForPageNumber(pageItemsSize)(
          Math.max(0, pageNumber - 1)
        );
        const next = helpers.getLinkForPageNumber(pageItemsSize)(
          Math.min(totalPages, pageNumber + 1)
        );

        return { self, first, last, prev, next, related };
      },
      useFormatting: (formatting) => {
        const { statusCode } = formatting;
        return httpCtx.response.status(statusCode).json(formatting);
      },
    }),

    Found: new HttpDataResponseFormatter({
      statusCode: 302,
      buildMessage: (msgCtx) => helpers.defaultMessageBuild(msgCtx),
      buildLinks: (meta) => {
        if (typeof meta === 'undefined') return undefined;
        const { pagination } = meta;

        const self = '/home';
        const related = null;

        if (typeof pagination === 'undefined') {
          return { self, related };
        }

        const { pageNumber, pageItemsSize, totalPages } = pagination;
        const first = helpers.getLinkForPageNumber(pageItemsSize)(0);
        const last = helpers.getLinkForPageNumber(pageItemsSize)(totalPages);
        const prev = helpers.getLinkForPageNumber(pageItemsSize)(
          Math.max(0, pageNumber - 1)
        );
        const next = helpers.getLinkForPageNumber(pageItemsSize)(
          Math.min(totalPages, pageNumber + 1)
        );

        return { self, first, last, prev, next, related };
      },
      useFormatting: (formatting) => {
        const { statusCode } = formatting;
        return httpCtx.response.status(statusCode).json(formatting);
      },
    }),

    SeeOther: new HttpDataResponseFormatter({
      statusCode: 303,
      buildMessage: (msgCtx) => helpers.defaultMessageBuild(msgCtx),
      buildLinks: (meta) => {
        if (typeof meta === 'undefined') return undefined;
        const { pagination } = meta;

        const self = '/home';
        const related = null;

        if (typeof pagination === 'undefined') {
          return { self, related };
        }

        const { pageNumber, pageItemsSize, totalPages } = pagination;
        const first = helpers.getLinkForPageNumber(pageItemsSize)(0);
        const last = helpers.getLinkForPageNumber(pageItemsSize)(totalPages);
        const prev = helpers.getLinkForPageNumber(pageItemsSize)(
          Math.max(0, pageNumber - 1)
        );
        const next = helpers.getLinkForPageNumber(pageItemsSize)(
          Math.min(totalPages, pageNumber + 1)
        );

        return { self, first, last, prev, next, related };
      },
      useFormatting: (formatting) => {
        const { statusCode } = formatting;
        return httpCtx.response.status(statusCode).json(formatting);
      },
    }),

    NotModified: new HttpDataResponseFormatter({
      statusCode: 304,
      buildMessage: (msgCtx) => helpers.defaultMessageBuild(msgCtx),
      buildLinks: (meta) => {
        if (typeof meta === 'undefined') return undefined;
        const { pagination } = meta;

        const self = '/home';
        const related = null;

        if (typeof pagination === 'undefined') {
          return { self, related };
        }

        const { pageNumber, pageItemsSize, totalPages } = pagination;
        const first = helpers.getLinkForPageNumber(pageItemsSize)(0);
        const last = helpers.getLinkForPageNumber(pageItemsSize)(totalPages);
        const prev = helpers.getLinkForPageNumber(pageItemsSize)(
          Math.max(0, pageNumber - 1)
        );
        const next = helpers.getLinkForPageNumber(pageItemsSize)(
          Math.min(totalPages, pageNumber + 1)
        );

        return { self, first, last, prev, next, related };
      },
      useFormatting: (formatting) => {
        const { statusCode } = formatting;
        return httpCtx.response.status(statusCode).json(formatting);
      },
    }),

    UseProxy: new HttpDataResponseFormatter({
      statusCode: 305,
      buildMessage: (msgCtx) => helpers.defaultMessageBuild(msgCtx),
      buildLinks: (meta) => {
        if (typeof meta === 'undefined') return undefined;
        const { pagination } = meta;

        const self = '/home';
        const related = null;

        if (typeof pagination === 'undefined') {
          return { self, related };
        }

        const { pageNumber, pageItemsSize, totalPages } = pagination;
        const first = helpers.getLinkForPageNumber(pageItemsSize)(0);
        const last = helpers.getLinkForPageNumber(pageItemsSize)(totalPages);
        const prev = helpers.getLinkForPageNumber(pageItemsSize)(
          Math.max(0, pageNumber - 1)
        );
        const next = helpers.getLinkForPageNumber(pageItemsSize)(
          Math.min(totalPages, pageNumber + 1)
        );

        return { self, first, last, prev, next, related };
      },
      useFormatting: (formatting) => {
        const { statusCode } = formatting;
        return httpCtx.response.status(statusCode).json(formatting);
      },
    }),

    TemporaryRedirect: new HttpDataResponseFormatter({
      statusCode: 307,
      buildMessage: (msgCtx) => helpers.defaultMessageBuild(msgCtx),
      buildLinks: (meta) => {
        if (typeof meta === 'undefined') return undefined;
        const { pagination } = meta;

        const self = '/home';
        const related = null;

        if (typeof pagination === 'undefined') {
          return { self, related };
        }

        const { pageNumber, pageItemsSize, totalPages } = pagination;
        const first = helpers.getLinkForPageNumber(pageItemsSize)(0);
        const last = helpers.getLinkForPageNumber(pageItemsSize)(totalPages);
        const prev = helpers.getLinkForPageNumber(pageItemsSize)(
          Math.max(0, pageNumber - 1)
        );
        const next = helpers.getLinkForPageNumber(pageItemsSize)(
          Math.min(totalPages, pageNumber + 1)
        );

        return { self, first, last, prev, next, related };
      },
      useFormatting: (formatting) => {
        const { statusCode } = formatting;
        return httpCtx.response.status(statusCode).json(formatting);
      },
    }),

    PermanentRedirect: new HttpDataResponseFormatter({
      statusCode: 308,
      buildMessage: (msgCtx) => helpers.defaultMessageBuild(msgCtx),
      buildLinks: (meta) => {
        if (typeof meta === 'undefined') return undefined;
        const { pagination } = meta;

        const self = '/home';
        const related = null;

        if (typeof pagination === 'undefined') {
          return { self, related };
        }

        const { pageNumber, pageItemsSize, totalPages } = pagination;
        const first = helpers.getLinkForPageNumber(pageItemsSize)(0);
        const last = helpers.getLinkForPageNumber(pageItemsSize)(totalPages);
        const prev = helpers.getLinkForPageNumber(pageItemsSize)(
          Math.max(0, pageNumber - 1)
        );
        const next = helpers.getLinkForPageNumber(pageItemsSize)(
          Math.min(totalPages, pageNumber + 1)
        );

        return { self, first, last, prev, next, related };
      },
      useFormatting: (formatting) => {
        const { statusCode } = formatting;
        return httpCtx.response.status(statusCode).json(formatting);
      },
    }),
  };
};

// import * as helpers from './responders-helpers';
// import { Request, Response } from 'express';
// import { HttpDataResponseFormatter } from 'src/common/plugins/http/http-data-formatter';

// export const BuildContinue = (httpCtx: { request: Request; response: Response }) => {
//   return new HttpDataResponseFormatter({
//     statusCode: 100,
//     buildMessage: (msgCtx) => helpers.defaultMessageBuild(msgCtx),
//     buildLinks: (meta) => {
//       if (typeof meta === 'undefined') return undefined;
//       const { pagination } = meta;

//       const self = '/home';
//       const related = null;

//       if (typeof pagination === 'undefined') {
//         return { self, related };
//       }

//       const { pageNumber, pageItemsSize, totalPages } = pagination;
//       const first = helpers.getLinkForPageNumber(pageItemsSize)(0);
//       const last = helpers.getLinkForPageNumber(pageItemsSize)(totalPages);
//       const prev = helpers.getLinkForPageNumber(pageItemsSize)(
//         Math.max(0, pageNumber - 1)
//       );
//       const next = helpers.getLinkForPageNumber(pageItemsSize)(
//         Math.min(totalPages, pageNumber + 1)
//       );

//       return { self, first, last, prev, next, related };
//     },
//     useFormatting: (formatting) => {
//       const { statusCode } = formatting;
//       return httpCtx.response.status(statusCode).json(formatting);
//     },
//   });
// };

// export const SwitchingProtocols = (httpCtx: {
//   request: Request;
//   response: Response;
// }) => {
//   return new HttpDataResponseFormatter({
//     statusCode: 101,
//     buildMessage: (msgCtx) => helpers.defaultMessageBuild(msgCtx),
//     buildLinks: (meta) => {
//       if (typeof meta === 'undefined') return undefined;
//       const { pagination } = meta;

//       const self = '/home';
//       const related = null;

//       if (typeof pagination === 'undefined') {
//         return { self, related };
//       }

//       const { pageNumber, pageItemsSize, totalPages } = pagination;
//       const first = helpers.getLinkForPageNumber(pageItemsSize)(0);
//       const last = helpers.getLinkForPageNumber(pageItemsSize)(totalPages);
//       const prev = helpers.getLinkForPageNumber(pageItemsSize)(
//         Math.max(0, pageNumber - 1)
//       );
//       const next = helpers.getLinkForPageNumber(pageItemsSize)(
//         Math.min(totalPages, pageNumber + 1)
//       );

//       return { self, first, last, prev, next, related };
//     },
//     useFormatting: (formatting) => {
//       const { statusCode } = formatting;
//       return httpCtx.response.status(statusCode).json(formatting);
//     },
//   });
// };

// export const Processing = (httpCtx: {
//   request: Request;
//   response: Response;
// }) => {
//   return new HttpDataResponseFormatter({
//     statusCode: 102,
//     buildMessage: (msgCtx) => helpers.defaultMessageBuild(msgCtx),
//     buildLinks: (meta) => {
//       if (typeof meta === 'undefined') return undefined;
//       const { pagination } = meta;

//       const self = '/home';
//       const related = null;

//       if (typeof pagination === 'undefined') {
//         return { self, related };
//       }

//       const { pageNumber, pageItemsSize, totalPages } = pagination;
//       const first = helpers.getLinkForPageNumber(pageItemsSize)(0);
//       const last = helpers.getLinkForPageNumber(pageItemsSize)(totalPages);
//       const prev = helpers.getLinkForPageNumber(pageItemsSize)(
//         Math.max(0, pageNumber - 1)
//       );
//       const next = helpers.getLinkForPageNumber(pageItemsSize)(
//         Math.min(totalPages, pageNumber + 1)
//       );

//       return { self, first, last, prev, next, related };
//     },
//     useFormatting: (formatting) => {
//       const { statusCode } = formatting;
//       return httpCtx.response.status(statusCode).json(formatting);
//     },
//   });
// };

// export const EarlyHints = (httpCtx: {
//   request: Request;
//   response: Response;
// }) => {
//   return new HttpDataResponseFormatter({
//     statusCode: 103,
//     buildMessage: (msgCtx) => helpers.defaultMessageBuild(msgCtx),
//     buildLinks: (meta) => {
//       if (typeof meta === 'undefined') return undefined;
//       const { pagination } = meta;

//       const self = '/home';
//       const related = null;

//       if (typeof pagination === 'undefined') {
//         return { self, related };
//       }

//       const { pageNumber, pageItemsSize, totalPages } = pagination;
//       const first = helpers.getLinkForPageNumber(pageItemsSize)(0);
//       const last = helpers.getLinkForPageNumber(pageItemsSize)(totalPages);
//       const prev = helpers.getLinkForPageNumber(pageItemsSize)(
//         Math.max(0, pageNumber - 1)
//       );
//       const next = helpers.getLinkForPageNumber(pageItemsSize)(
//         Math.min(totalPages, pageNumber + 1)
//       );

//       return { self, first, last, prev, next, related };
//     },
//     useFormatting: (formatting) => {
//       const { statusCode } = formatting;
//       return httpCtx.response.status(statusCode).json(formatting);
//     },
//   });
// };

// export const OK = (httpCtx: { request: Request; response: Response }) => {
//   return new HttpDataResponseFormatter({
//     statusCode: 200,
//     buildMessage: (msgCtx) => helpers.defaultMessageBuild(msgCtx),
//     buildLinks: (meta) => {
//       if (typeof meta === 'undefined') return undefined;
//       const { pagination } = meta;

//       const self = '/home';
//       const related = null;

//       if (typeof pagination === 'undefined') {
//         return { self, related };
//       }

//       const { pageNumber, pageItemsSize, totalPages } = pagination;
//       const first = helpers.getLinkForPageNumber(pageItemsSize)(0);
//       const last = helpers.getLinkForPageNumber(pageItemsSize)(totalPages);
//       const prev = helpers.getLinkForPageNumber(pageItemsSize)(
//         Math.max(0, pageNumber - 1)
//       );
//       const next = helpers.getLinkForPageNumber(pageItemsSize)(
//         Math.min(totalPages, pageNumber + 1)
//       );

//       return { self, first, last, prev, next, related };
//     },
//     useFormatting: (formatting) => {
//       const { statusCode } = formatting;
//       return httpCtx.response.status(statusCode).json(formatting);
//     },
//   });
// };

// export const Created = (httpCtx: { request: Request; response: Response }) => {
//   return new HttpDataResponseFormatter({
//     statusCode: 201,
//     buildMessage: (msgCtx) => helpers.defaultMessageBuild(msgCtx),
//     buildLinks: (meta) => {
//       if (typeof meta === 'undefined') return undefined;
//       const { pagination } = meta;

//       const self = '/home';
//       const related = null;

//       if (typeof pagination === 'undefined') {
//         return { self, related };
//       }

//       const { pageNumber, pageItemsSize, totalPages } = pagination;
//       const first = helpers.getLinkForPageNumber(pageItemsSize)(0);
//       const last = helpers.getLinkForPageNumber(pageItemsSize)(totalPages);
//       const prev = helpers.getLinkForPageNumber(pageItemsSize)(
//         Math.max(0, pageNumber - 1)
//       );
//       const next = helpers.getLinkForPageNumber(pageItemsSize)(
//         Math.min(totalPages, pageNumber + 1)
//       );

//       return { self, first, last, prev, next, related };
//     },
//     useFormatting: (formatting) => {
//       const { statusCode } = formatting;
//       return httpCtx.response.status(statusCode).json(formatting);
//     },
//   });
// };

// export const Accepted = (httpCtx: { request: Request; response: Response }) => {
//   return new HttpDataResponseFormatter({
//     statusCode: 202,
//     buildMessage: (msgCtx) => helpers.defaultMessageBuild(msgCtx),
//     buildLinks: (meta) => {
//       if (typeof meta === 'undefined') return undefined;
//       const { pagination } = meta;

//       const self = '/home';
//       const related = null;

//       if (typeof pagination === 'undefined') {
//         return { self, related };
//       }

//       const { pageNumber, pageItemsSize, totalPages } = pagination;
//       const first = helpers.getLinkForPageNumber(pageItemsSize)(0);
//       const last = helpers.getLinkForPageNumber(pageItemsSize)(totalPages);
//       const prev = helpers.getLinkForPageNumber(pageItemsSize)(
//         Math.max(0, pageNumber - 1)
//       );
//       const next = helpers.getLinkForPageNumber(pageItemsSize)(
//         Math.min(totalPages, pageNumber + 1)
//       );

//       return { self, first, last, prev, next, related };
//     },
//     useFormatting: (formatting) => {
//       const { statusCode } = formatting;
//       return httpCtx.response.status(statusCode).json(formatting);
//     },
//   });
// };

// export const NonAuthoritativeInformation = (httpCtx: {
//   request: Request;
//   response: Response;
// }) => {
//   return new HttpDataResponseFormatter({
//     statusCode: 203,
//     buildMessage: (msgCtx) => helpers.defaultMessageBuild(msgCtx),
//     buildLinks: (meta) => {
//       if (typeof meta === 'undefined') return undefined;
//       const { pagination } = meta;

//       const self = '/home';
//       const related = null;

//       if (typeof pagination === 'undefined') {
//         return { self, related };
//       }

//       const { pageNumber, pageItemsSize, totalPages } = pagination;
//       const first = helpers.getLinkForPageNumber(pageItemsSize)(0);
//       const last = helpers.getLinkForPageNumber(pageItemsSize)(totalPages);
//       const prev = helpers.getLinkForPageNumber(pageItemsSize)(
//         Math.max(0, pageNumber - 1)
//       );
//       const next = helpers.getLinkForPageNumber(pageItemsSize)(
//         Math.min(totalPages, pageNumber + 1)
//       );

//       return { self, first, last, prev, next, related };
//     },
//     useFormatting: (formatting) => {
//       const { statusCode } = formatting;
//       return httpCtx.response.status(statusCode).json(formatting);
//     },
//   });
// };

// export const NoContent = (httpCtx: {
//   request: Request;
//   response: Response;
// }) => {
//   return new HttpDataResponseFormatter({
//     statusCode: 204,
//     buildMessage: (msgCtx) => helpers.defaultMessageBuild(msgCtx),
//     buildLinks: (meta) => {
//       if (typeof meta === 'undefined') return undefined;
//       const { pagination } = meta;

//       const self = '/home';
//       const related = null;

//       if (typeof pagination === 'undefined') {
//         return { self, related };
//       }

//       const { pageNumber, pageItemsSize, totalPages } = pagination;
//       const first = helpers.getLinkForPageNumber(pageItemsSize)(0);
//       const last = helpers.getLinkForPageNumber(pageItemsSize)(totalPages);
//       const prev = helpers.getLinkForPageNumber(pageItemsSize)(
//         Math.max(0, pageNumber - 1)
//       );
//       const next = helpers.getLinkForPageNumber(pageItemsSize)(
//         Math.min(totalPages, pageNumber + 1)
//       );

//       return { self, first, last, prev, next, related };
//     },
//     useFormatting: (formatting) => {
//       const { statusCode } = formatting;
//       return httpCtx.response.status(statusCode).json(formatting);
//     },
//   });
// };

// export const ResetContent = (httpCtx: {
//   request: Request;
//   response: Response;
// }) => {
//   return new HttpDataResponseFormatter({
//     statusCode: 205,
//     buildMessage: (msgCtx) => helpers.defaultMessageBuild(msgCtx),
//     buildLinks: (meta) => {
//       if (typeof meta === 'undefined') return undefined;
//       const { pagination } = meta;

//       const self = '/home';
//       const related = null;

//       if (typeof pagination === 'undefined') {
//         return { self, related };
//       }

//       const { pageNumber, pageItemsSize, totalPages } = pagination;
//       const first = helpers.getLinkForPageNumber(pageItemsSize)(0);
//       const last = helpers.getLinkForPageNumber(pageItemsSize)(totalPages);
//       const prev = helpers.getLinkForPageNumber(pageItemsSize)(
//         Math.max(0, pageNumber - 1)
//       );
//       const next = helpers.getLinkForPageNumber(pageItemsSize)(
//         Math.min(totalPages, pageNumber + 1)
//       );

//       return { self, first, last, prev, next, related };
//     },
//     useFormatting: (formatting) => {
//       const { statusCode } = formatting;
//       return httpCtx.response.status(statusCode).json(formatting);
//     },
//   });
// };

// export const PartialContent = (httpCtx: {
//   request: Request;
//   response: Response;
// }) => {
//   return new HttpDataResponseFormatter({
//     statusCode: 206,
//     buildMessage: (msgCtx) => helpers.defaultMessageBuild(msgCtx),
//     buildLinks: (meta) => {
//       if (typeof meta === 'undefined') return undefined;
//       const { pagination } = meta;

//       const self = '/home';
//       const related = null;

//       if (typeof pagination === 'undefined') {
//         return { self, related };
//       }

//       const { pageNumber, pageItemsSize, totalPages } = pagination;
//       const first = helpers.getLinkForPageNumber(pageItemsSize)(0);
//       const last = helpers.getLinkForPageNumber(pageItemsSize)(totalPages);
//       const prev = helpers.getLinkForPageNumber(pageItemsSize)(
//         Math.max(0, pageNumber - 1)
//       );
//       const next = helpers.getLinkForPageNumber(pageItemsSize)(
//         Math.min(totalPages, pageNumber + 1)
//       );

//       return { self, first, last, prev, next, related };
//     },
//     useFormatting: (formatting) => {
//       const { statusCode } = formatting;
//       return httpCtx.response.status(statusCode).json(formatting);
//     },
//   });
// };

// export const MultiStatus = (httpCtx: {
//   request: Request;
//   response: Response;
// }) => {
//   return new HttpDataResponseFormatter({
//     statusCode: 207,
//     buildMessage: (msgCtx) => helpers.defaultMessageBuild(msgCtx),
//     buildLinks: (meta) => {
//       if (typeof meta === 'undefined') return undefined;
//       const { pagination } = meta;

//       const self = '/home';
//       const related = null;

//       if (typeof pagination === 'undefined') {
//         return { self, related };
//       }

//       const { pageNumber, pageItemsSize, totalPages } = pagination;
//       const first = helpers.getLinkForPageNumber(pageItemsSize)(0);
//       const last = helpers.getLinkForPageNumber(pageItemsSize)(totalPages);
//       const prev = helpers.getLinkForPageNumber(pageItemsSize)(
//         Math.max(0, pageNumber - 1)
//       );
//       const next = helpers.getLinkForPageNumber(pageItemsSize)(
//         Math.min(totalPages, pageNumber + 1)
//       );

//       return { self, first, last, prev, next, related };
//     },
//     useFormatting: (formatting) => {
//       const { statusCode } = formatting;
//       return httpCtx.response.status(statusCode).json(formatting);
//     },
//   });
// };

// export const AlreadyReported = (httpCtx: {
//   request: Request;
//   response: Response;
// }) => {
//   return new HttpDataResponseFormatter({
//     statusCode: 208,
//     buildMessage: (msgCtx) => helpers.defaultMessageBuild(msgCtx),
//     buildLinks: (meta) => {
//       if (typeof meta === 'undefined') return undefined;
//       const { pagination } = meta;

//       const self = '/home';
//       const related = null;

//       if (typeof pagination === 'undefined') {
//         return { self, related };
//       }

//       const { pageNumber, pageItemsSize, totalPages } = pagination;
//       const first = helpers.getLinkForPageNumber(pageItemsSize)(0);
//       const last = helpers.getLinkForPageNumber(pageItemsSize)(totalPages);
//       const prev = helpers.getLinkForPageNumber(pageItemsSize)(
//         Math.max(0, pageNumber - 1)
//       );
//       const next = helpers.getLinkForPageNumber(pageItemsSize)(
//         Math.min(totalPages, pageNumber + 1)
//       );

//       return { self, first, last, prev, next, related };
//     },
//     useFormatting: (formatting) => {
//       const { statusCode } = formatting;
//       return httpCtx.response.status(statusCode).json(formatting);
//     },
//   });
// };

// export const IMUsed = (httpCtx: { request: Request; response: Response }) => {
//   return new HttpDataResponseFormatter({
//     statusCode: 226,
//     buildMessage: (msgCtx) => helpers.defaultMessageBuild(msgCtx),
//     buildLinks: (meta) => {
//       if (typeof meta === 'undefined') return undefined;
//       const { pagination } = meta;

//       const self = '/home';
//       const related = null;

//       if (typeof pagination === 'undefined') {
//         return { self, related };
//       }

//       const { pageNumber, pageItemsSize, totalPages } = pagination;
//       const first = helpers.getLinkForPageNumber(pageItemsSize)(0);
//       const last = helpers.getLinkForPageNumber(pageItemsSize)(totalPages);
//       const prev = helpers.getLinkForPageNumber(pageItemsSize)(
//         Math.max(0, pageNumber - 1)
//       );
//       const next = helpers.getLinkForPageNumber(pageItemsSize)(
//         Math.min(totalPages, pageNumber + 1)
//       );

//       return { self, first, last, prev, next, related };
//     },
//     useFormatting: (formatting) => {
//       const { statusCode } = formatting;
//       return httpCtx.response.status(statusCode).json(formatting);
//     },
//   });
// };

// export const MultipleChoices = (httpCtx: {
//   request: Request;
//   response: Response;
// }) => {
//   return new HttpDataResponseFormatter({
//     statusCode: 300,
//     buildMessage: (msgCtx) => helpers.defaultMessageBuild(msgCtx),
//     buildLinks: (meta) => {
//       if (typeof meta === 'undefined') return undefined;
//       const { pagination } = meta;

//       const self = '/home';
//       const related = null;

//       if (typeof pagination === 'undefined') {
//         return { self, related };
//       }

//       const { pageNumber, pageItemsSize, totalPages } = pagination;
//       const first = helpers.getLinkForPageNumber(pageItemsSize)(0);
//       const last = helpers.getLinkForPageNumber(pageItemsSize)(totalPages);
//       const prev = helpers.getLinkForPageNumber(pageItemsSize)(
//         Math.max(0, pageNumber - 1)
//       );
//       const next = helpers.getLinkForPageNumber(pageItemsSize)(
//         Math.min(totalPages, pageNumber + 1)
//       );

//       return { self, first, last, prev, next, related };
//     },
//     useFormatting: (formatting) => {
//       const { statusCode } = formatting;
//       return httpCtx.response.status(statusCode).json(formatting);
//     },
//   });
// };

// export const MovedPermanently = (httpCtx: {
//   request: Request;
//   response: Response;
// }) => {
//   return new HttpDataResponseFormatter({
//     statusCode: 301,
//     buildMessage: (msgCtx) => helpers.defaultMessageBuild(msgCtx),
//     buildLinks: (meta) => {
//       if (typeof meta === 'undefined') return undefined;
//       const { pagination } = meta;

//       const self = '/home';
//       const related = null;

//       if (typeof pagination === 'undefined') {
//         return { self, related };
//       }

//       const { pageNumber, pageItemsSize, totalPages } = pagination;
//       const first = helpers.getLinkForPageNumber(pageItemsSize)(0);
//       const last = helpers.getLinkForPageNumber(pageItemsSize)(totalPages);
//       const prev = helpers.getLinkForPageNumber(pageItemsSize)(
//         Math.max(0, pageNumber - 1)
//       );
//       const next = helpers.getLinkForPageNumber(pageItemsSize)(
//         Math.min(totalPages, pageNumber + 1)
//       );

//       return { self, first, last, prev, next, related };
//     },
//     useFormatting: (formatting) => {
//       const { statusCode } = formatting;
//       return httpCtx.response.status(statusCode).json(formatting);
//     },
//   });
// };

// export const Found = (httpCtx: { request: Request; response: Response }) => {
//   return new HttpDataResponseFormatter({
//     statusCode: 302,
//     buildMessage: (msgCtx) => helpers.defaultMessageBuild(msgCtx),
//     buildLinks: (meta) => {
//       if (typeof meta === 'undefined') return undefined;
//       const { pagination } = meta;

//       const self = '/home';
//       const related = null;

//       if (typeof pagination === 'undefined') {
//         return { self, related };
//       }

//       const { pageNumber, pageItemsSize, totalPages } = pagination;
//       const first = helpers.getLinkForPageNumber(pageItemsSize)(0);
//       const last = helpers.getLinkForPageNumber(pageItemsSize)(totalPages);
//       const prev = helpers.getLinkForPageNumber(pageItemsSize)(
//         Math.max(0, pageNumber - 1)
//       );
//       const next = helpers.getLinkForPageNumber(pageItemsSize)(
//         Math.min(totalPages, pageNumber + 1)
//       );

//       return { self, first, last, prev, next, related };
//     },
//     useFormatting: (formatting) => {
//       const { statusCode } = formatting;
//       return httpCtx.response.status(statusCode).json(formatting);
//     },
//   });
// };

// export const SeeOther = (httpCtx: { request: Request; response: Response }) => {
//   return new HttpDataResponseFormatter({
//     statusCode: 303,
//     buildMessage: (msgCtx) => helpers.defaultMessageBuild(msgCtx),
//     buildLinks: (meta) => {
//       if (typeof meta === 'undefined') return undefined;
//       const { pagination } = meta;

//       const self = '/home';
//       const related = null;

//       if (typeof pagination === 'undefined') {
//         return { self, related };
//       }

//       const { pageNumber, pageItemsSize, totalPages } = pagination;
//       const first = helpers.getLinkForPageNumber(pageItemsSize)(0);
//       const last = helpers.getLinkForPageNumber(pageItemsSize)(totalPages);
//       const prev = helpers.getLinkForPageNumber(pageItemsSize)(
//         Math.max(0, pageNumber - 1)
//       );
//       const next = helpers.getLinkForPageNumber(pageItemsSize)(
//         Math.min(totalPages, pageNumber + 1)
//       );

//       return { self, first, last, prev, next, related };
//     },
//     useFormatting: (formatting) => {
//       const { statusCode } = formatting;
//       return httpCtx.response.status(statusCode).json(formatting);
//     },
//   });
// };

// export const NotModified = (httpCtx: {
//   request: Request;
//   response: Response;
// }) => {
//   return new HttpDataResponseFormatter({
//     statusCode: 304,
//     buildMessage: (msgCtx) => helpers.defaultMessageBuild(msgCtx),
//     buildLinks: (meta) => {
//       if (typeof meta === 'undefined') return undefined;
//       const { pagination } = meta;

//       const self = '/home';
//       const related = null;

//       if (typeof pagination === 'undefined') {
//         return { self, related };
//       }

//       const { pageNumber, pageItemsSize, totalPages } = pagination;
//       const first = helpers.getLinkForPageNumber(pageItemsSize)(0);
//       const last = helpers.getLinkForPageNumber(pageItemsSize)(totalPages);
//       const prev = helpers.getLinkForPageNumber(pageItemsSize)(
//         Math.max(0, pageNumber - 1)
//       );
//       const next = helpers.getLinkForPageNumber(pageItemsSize)(
//         Math.min(totalPages, pageNumber + 1)
//       );

//       return { self, first, last, prev, next, related };
//     },
//     useFormatting: (formatting) => {
//       const { statusCode } = formatting;
//       return httpCtx.response.status(statusCode).json(formatting);
//     },
//   });
// };

// export const UseProxy = (httpCtx: { request: Request; response: Response }) => {
//   return new HttpDataResponseFormatter({
//     statusCode: 305,
//     buildMessage: (msgCtx) => helpers.defaultMessageBuild(msgCtx),
//     buildLinks: (meta) => {
//       if (typeof meta === 'undefined') return undefined;
//       const { pagination } = meta;

//       const self = '/home';
//       const related = null;

//       if (typeof pagination === 'undefined') {
//         return { self, related };
//       }

//       const { pageNumber, pageItemsSize, totalPages } = pagination;
//       const first = helpers.getLinkForPageNumber(pageItemsSize)(0);
//       const last = helpers.getLinkForPageNumber(pageItemsSize)(totalPages);
//       const prev = helpers.getLinkForPageNumber(pageItemsSize)(
//         Math.max(0, pageNumber - 1)
//       );
//       const next = helpers.getLinkForPageNumber(pageItemsSize)(
//         Math.min(totalPages, pageNumber + 1)
//       );

//       return { self, first, last, prev, next, related };
//     },
//     useFormatting: (formatting) => {
//       const { statusCode } = formatting;
//       return httpCtx.response.status(statusCode).json(formatting);
//     },
//   });
// };

// export const TemporaryRedirect = (httpCtx: {
//   request: Request;
//   response: Response;
// }) => {
//   return new HttpDataResponseFormatter({
//     statusCode: 307,
//     buildMessage: (msgCtx) => helpers.defaultMessageBuild(msgCtx),
//     buildLinks: (meta) => {
//       if (typeof meta === 'undefined') return undefined;
//       const { pagination } = meta;

//       const self = '/home';
//       const related = null;

//       if (typeof pagination === 'undefined') {
//         return { self, related };
//       }

//       const { pageNumber, pageItemsSize, totalPages } = pagination;
//       const first = helpers.getLinkForPageNumber(pageItemsSize)(0);
//       const last = helpers.getLinkForPageNumber(pageItemsSize)(totalPages);
//       const prev = helpers.getLinkForPageNumber(pageItemsSize)(
//         Math.max(0, pageNumber - 1)
//       );
//       const next = helpers.getLinkForPageNumber(pageItemsSize)(
//         Math.min(totalPages, pageNumber + 1)
//       );

//       return { self, first, last, prev, next, related };
//     },
//     useFormatting: (formatting) => {
//       const { statusCode } = formatting;
//       return httpCtx.response.status(statusCode).json(formatting);
//     },
//   });
// };

// export const PermanentRedirect = (httpCtx: {
//   request: Request;
//   response: Response;
// }) => {
//   return new HttpDataResponseFormatter({
//     statusCode: 308,
//     buildMessage: (msgCtx) => helpers.defaultMessageBuild(msgCtx),
//     buildLinks: (meta) => {
//       if (typeof meta === 'undefined') return undefined;
//       const { pagination } = meta;

//       const self = '/home';
//       const related = null;

//       if (typeof pagination === 'undefined') {
//         return { self, related };
//       }

//       const { pageNumber, pageItemsSize, totalPages } = pagination;
//       const first = helpers.getLinkForPageNumber(pageItemsSize)(0);
//       const last = helpers.getLinkForPageNumber(pageItemsSize)(totalPages);
//       const prev = helpers.getLinkForPageNumber(pageItemsSize)(
//         Math.max(0, pageNumber - 1)
//       );
//       const next = helpers.getLinkForPageNumber(pageItemsSize)(
//         Math.min(totalPages, pageNumber + 1)
//       );

//       return { self, first, last, prev, next, related };
//     },
//     useFormatting: (formatting) => {
//       const { statusCode } = formatting;
//       return httpCtx.response.status(statusCode).json(formatting);
//     },
//   });
// };
