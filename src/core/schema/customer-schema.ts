import { z } from 'zod';
import { zExtension } from 'src/common/extensions/zod';
import { CUSTOMER_MEMBERSHIPS } from 'src/core/models/customer-model';

export const RegistrationForm = {
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  dateOfBirth: z.string().datetime(),
  phoneNumber: z.string().min(3),
  membership: z.enum(CUSTOMER_MEMBERSHIPS),
};

export const SelfPatchDefinition = {
  ...RegistrationForm,
};

export const CrossPatchDefinition = {
  ...RegistrationForm,
  isBanned: z.boolean(),
};

export const RegistrantDefinition = {
  ...CrossPatchDefinition,
  _id: zExtension.ObjectId(),
};

export const RegistrationSchema = z.object(RegistrationForm);
export const SelfPatchSchema = z.object(SelfPatchDefinition).partial();
export const CrossPatchSchema = z.object(CrossPatchDefinition).partial();
export const RegistrantSchema = z.object(RegistrantDefinition).required();

export type RegistrationInput = z.TypeOf<typeof RegistrationSchema>;
export type SelfPatchInput = z.TypeOf<typeof SelfPatchSchema>;
export type CrossPatchInput = z.TypeOf<typeof CrossPatchSchema>;
export type RegistrantInput = z.TypeOf<typeof RegistrantSchema>;
