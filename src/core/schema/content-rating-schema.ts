import { z } from 'zod';

export const RegistrationForm = {
  title: z.string(),
  ageSuitableFor: z.number().min(0),
  description: z.string().optional(),
};

export const EditForm = {
  ...RegistrationForm,
  isDiscontinued: z.boolean(),
};

export const RegistrationSchema = z.object(RegistrationForm);
export const EditSchema = z.object(EditForm).partial();

export type RegistrationInput = z.TypeOf<typeof RegistrationSchema>;
export type EditInput = z.TypeOf<typeof EditSchema>;
