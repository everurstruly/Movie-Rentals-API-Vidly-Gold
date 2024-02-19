import asyncMiddleware from 'src/core/middleware/shared/async-middleware';
import * as responders from './responders';
import * as objliteralUtils from 'src/common/utils/datatype/object-literal-utils';

const defaultOptions = {
  accessor: 'kit.formatter',
};

const buildFormatters = (request: any, response: any) => {
  return {
    OK: responders.OK({ request, response }),
  };
};

export type HttpResponseFormatters = ReturnType<typeof buildFormatters>;

export const httpResponseFormatter = (
  options: Partial<typeof defaultOptions> = {}
) => {
  const { accessor } = {
    ...defaultOptions,
    ...options,
  };

  return asyncMiddleware(async (req, res, next) => {
    objliteralUtils.setValueByPaths(req, accessor, {
      ...buildFormatters(req, res),
    });

    return next();
  });
};
