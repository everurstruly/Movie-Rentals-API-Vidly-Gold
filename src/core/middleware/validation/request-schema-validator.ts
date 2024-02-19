import asyncMiddleware from 'src/core/middleware/shared/async-middleware';
import { BadRequestErrorBuilder } from 'src/core/errors/http-errors';
import * as projSchema from 'src/core/schema';
import * as objliteralUtils from 'src/common/utils/datatype/object-literal-utils';

const defaultOptions = {
  validationName: 'user',
  validationResultLocation: 'locals.resourceValidation',
  keyOfRequestPropertyToValidate: 'body',
  shouldThrowValidationError: true,
};

export type DefaultOptions = typeof defaultOptions;
export type ResourceInputValidation = ReturnType<
  typeof projSchema.validateInput
>;

export type ValidationResult = Record<
  DefaultOptions['validationName'],
  ResourceInputValidation
>;

export type OptionsBatteriesIncluded = Partial<DefaultOptions> & {
  schemaToMatch: projSchema.SchemaToMatch;
};
export type OptionsAsBatteriesNotIncluded = Partial<DefaultOptions> & {
  validate: (resourceToBeValidated: any) => ResourceInputValidation;
};

export const validateResourceInput = (
  options: OptionsBatteriesIncluded | OptionsAsBatteriesNotIncluded
) => {
  return asyncMiddleware(async (req, res, next) => {
    const {
      validationName,
      validationResultLocation,
      keyOfRequestPropertyToValidate,
      shouldThrowValidationError,
    } = { ...defaultOptions, ...options };

    const inputToBeValidated = objliteralUtils.getValueByPaths(
      req,
      keyOfRequestPropertyToValidate
    );

    const optionsA = options as OptionsAsBatteriesNotIncluded;
    const optionsB = options as OptionsBatteriesIncluded;

    const validationResult = optionsA.validate
      ? optionsA.validate(inputToBeValidated)
      : projSchema.validateInput(optionsB.schemaToMatch, inputToBeValidated);

    objliteralUtils.setValueByPaths(
      req,
      [validationResultLocation, validationName],
      validationResult
    );

    const unsuccessfulValidation =
      validationResult as projSchema.UnSuccessfulValidationResponse;

    if (unsuccessfulValidation.issues && shouldThrowValidationError) {
      BadRequestErrorBuilder().addIssues(unsuccessfulValidation.issues).use({
        message: `Resource doesn't match expected schema`,
      });
    }

    return next();
  });
};
