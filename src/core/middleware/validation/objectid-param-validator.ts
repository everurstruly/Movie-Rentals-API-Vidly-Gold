import mongoose from 'mongoose';
import asyncMiddleware from 'src/core/middleware/shared/async-middleware';
import * as obliteralUtils from 'src/common/utils/datatype/object-literal-utils';
import { BadRequestErrorBuilder } from '../../../storage/http-errors/bad-request-error';

const defaultOptions = {
  validationResultsLocation: 'locals.objectIdParamsValidation',
  doThrowValidationErrorOnParams: [] as string[],
};

export type ValidationResult = Record<
  string,
  {
    isObjectId: boolean;
    value: string;
  }
>;

export const validateObjectIdParam = (
  options: Partial<typeof defaultOptions> = {}
) => {
  return asyncMiddleware(async (req, res, next) => {
    const { validationResultsLocation, doThrowValidationErrorOnParams } = {
      ...defaultOptions,
      ...options,
    };

    const reqParamsKeys = obliteralUtils.objectKeys(req.params);
    const validationResults = reqParamsKeys.reduce((results, paramKey) => {
      const value = req.params[paramKey];
      const isObjectId = mongoose.isValidObjectId(value);
      results[paramKey] = { value, isObjectId };
      return results;
    }, {} as ValidationResult);

    obliteralUtils.setValueByPaths(
      req,
      validationResultsLocation,
      Object.freeze(validationResults)
    );

    for (const param of doThrowValidationErrorOnParams) {
      const existingParam = validationResults[param];
      if (existingParam && !existingParam.isObjectId) {
        throw BadRequestErrorBuilder()
          .addIssues((iss) => {
            return iss.invalidType({
              source: { parameter: param },
              value: existingParam,
              reason: 'invalid objectId',
            });
          })
          .use();
      }
    }

    return next();
  });
};
