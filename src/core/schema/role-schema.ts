import { z } from 'zod';

export const EditForm = {
  title: z.string(),
  level: z.number(),
};

export const RegistrationForm = {
  ...EditForm,
};

//

export const EditSchema = z.object(EditForm);
export const RegistrationSchema = z.object(RegistrationForm);

//

export type EditInput = z.TypeOf<typeof EditSchema>;
export type RegistrationInput = z.TypeOf<typeof RegistrationSchema>;
