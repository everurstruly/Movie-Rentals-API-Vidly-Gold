import * as objliteralUtils from 'src/common/utils/datatype/object-literal-utils';
import { z } from 'zod';
import { HttpErrorIssues } from 'src/storage/http-errors';
import { BadRequestErrorBuilder } from 'src/core/errorsbad-request-error';

const ZOD_ERROR_CODE_TO_PROJ_ERROR_CODE_ALIAS_DICT = {
  custom: 'badContent',
  invalid_type: 'invalidType',
  invalid_literal: 'invalidArgument',
  invalid_union: 'invalidArgument',
  invalid_union_discriminator: 'invalidArgument',
  invalid_enum_value: 'invalidType',
  unrecognized_keys: 'unrecognized',
  invalid_arguments: 'invalidArgument',
  invalid_return_type: 'unknownSyntax',
  invalid_date: 'invalidType',
  invalid_string: 'invalidType',
  too_small: 'tooSmall',
  too_big: 'tooBig',
  invalid_intersection_types: 'invalidType',
  not_multiple_of: 'badContent',
  not_finite: 'badContent',
} as const;

// const ZOD_ERROR_CODE_TO_PROJ_ERROR_CODE_DICT = {
//   custom: issueCodeAliasToValueDict.invalid,
//   invalid_type: issueCodeAliasToValueDict.invalidType,
//   invalid_literal: issueCodeAliasToValueDict.invalidArgument,
//   invalid_union: issueCodeAliasToValueDict.invalidArgument,
//   invalid_union_discriminator: issueCodeAliasToValueDict.invalidArgument,
//   invalid_enum_value: issueCodeAliasToValueDict.invalidType,
//   unrecognized_keys: issueCodeAliasToValueDict.unrecognized,
//   invalid_arguments: issueCodeAliasToValueDict.invalidArgument,
//   invalid_return_type: issueCodeAliasToValueDict.unknownSyntax,
//   invalid_date: issueCodeAliasToValueDict.invalidType,
//   invalid_string: issueCodeAliasToValueDict.invalidType,
//   too_small: issueCodeAliasToValueDict.tooSmall,
//   too_big: issueCodeAliasToValueDict.tooBig,
//   invalid_intersection_types: issueCodeAliasToValueDict.invalidType,
//   not_multiple_of: issueCodeAliasToValueDict.invalid,
//   not_finite: issueCodeAliasToValueDict.invalid,
// };

export type SchemaToMatch = z.Schema;

export type SuccessfulValidationResponse = {
  value: any;
};

export type UnSuccessfulValidationResponse = {
  issues: HttpError['issues'];
};

const UnSuccessfulValidationError = z.ZodError;

export const validateInput = (
  schemaToMatch: SchemaToMatch,
  resource: any
): SuccessfulValidationResponse | UnSuccessfulValidationResponse => {
  try {
    const value = schemaToMatch.parse(resource);
    return { value };
  } catch (validationError: any) {
    if (!(validationError instanceof UnSuccessfulValidationError)) {
      throw validationError;
    }

    const errorFormatter = BadRequestErrorBuilder();
    validationError.issues.flatMap((issue) => {
      const codeAlias =
        ZOD_ERROR_CODE_TO_PROJ_ERROR_CODE_ALIAS_DICT[issue.code];

      if (issue.code === 'unrecognized_keys') {
        issue.keys.map((path) => {
          errorFormatter.addIssues((issueFormatter) => {
            return [
              ...issueFormatter[codeAlias]({
                label: path,
                value: objliteralUtils.getValueByPaths(resource, path),
                reason: 'Unrecognized form field',
              }),
            ];
          });
        });
      } else {
        errorFormatter.addIssues((issueFormatter) => {
          return [
            ...issueFormatter[codeAlias]({
              label: issue.path.join('.'),
              value: objliteralUtils.getValueByPaths(resource, issue.path),
              reason: issue.message,
            }),
          ];
        });
      }
    });

    return { issues: errorFormatter.issues };
  }
};

(function __test__() {
  const { z } = require('zod');

  const rightlyFilledSignUpForm = {
    userlabel: 'aydin',
    age: 18,
    occupation: {
      location: 'online',
      level: 1,
    },
    title: 'software developer',
  };

  const badlyFilledsignUpFormBad = {
    imposterOne: 'hi',
    imposterTwo: 'hi',
    userlabel: 5,
    age: '2',
    occupation: {
      location: 5,
      level: 'hey',
    },
  };

  const SignupFormSchema = z
    .object({
      userlabel: z.string(),
      age: z.number(),
      occupation: z.object({
        location: z.string(),
        level: z.number(),
      }),
    })
    .strict();

  console.log(
    '(test) validator -',
    JSON.stringify(
      validateInput(SignupFormSchema, badlyFilledsignUpFormBad),
      null,
      1
    )
  );
});
// })();
