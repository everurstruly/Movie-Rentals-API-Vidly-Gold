import { z } from 'zod';
import { zExtension } from 'src/common/extensions/zod';

const MISMATCH_PASSWORD_ERROR_MSG = `Confirmation password does not match the desired password`;
const Password = z.string().min(6).max(255);

export const EditForm = {
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  dateOfBirth: z.string().datetime(),
  assignedRolesIds: z.array(zExtension.HexObjectId()).nonempty(),
};

export const RegistrationForm = {
  ...EditForm,
  email: z.string().email(),
  password: Password,
  confirmPassword: Password,
};

export const PasswordChangeAppealForm = {
  email: RegistrationForm.email,
};

export const PasswordChangeExecutionForm = {
  newPassword: RegistrationForm.password,
  confirmNewPassword: RegistrationForm.password,
};

export const LoginCredentials = {
  email: RegistrationForm.email,
  password: RegistrationForm.password.min(0),
};

export const LoginSessionTokenPayload = {
  userId: zExtension.HexObjectId(),
  isSuspended: z.boolean(),
  assignedRolesIds: RegistrationForm.assignedRolesIds,
};

//

export const EditFormSchema = z.object(EditForm).strict().partial();

export const RegistrationFormSchema = z
  .object(RegistrationForm)
  .strict()
  .required()
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword != password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['confirmPassword'],
        message: MISMATCH_PASSWORD_ERROR_MSG,
      });
    }
  });

export const PasswordChangeAppealFormSchema = z
  .object(PasswordChangeAppealForm)
  .required();

export const PasswordChangeExecutionFormSchema = z
  .object(PasswordChangeExecutionForm)
  .strict()
  .required()
  .superRefine(({ confirmNewPassword, newPassword }, ctx) => {
    if (confirmNewPassword != newPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['confirmNewPassword'],
        message: MISMATCH_PASSWORD_ERROR_MSG,
      });
    }
  });

export const LoginCredentialsSchema = z
  .object(LoginCredentials)
  .strict()
  .required();

export const LoginSessionTokenPayloadSchema = z
  .object(LoginSessionTokenPayload)
  .required();

//

export type EditFormInput = z.TypeOf<typeof EditFormSchema>;
export type RegistrationFormInput = z.TypeOf<typeof RegistrationFormSchema>;
export type LoginCredentialsInput = z.TypeOf<typeof LoginCredentialsSchema>;

export type PasswordChangeAppealInput = z.TypeOf<
  typeof PasswordChangeAppealFormSchema
>;

export type PasswordChangeExecutionInput = z.TypeOf<
  typeof PasswordChangeExecutionFormSchema
>;

export type LoginSessionTokenPayloadInput = z.TypeOf<
  typeof LoginSessionTokenPayloadSchema
>;
