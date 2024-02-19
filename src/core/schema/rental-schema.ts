import { z } from "zod";
import { zHexObjectId } from "./shared-schema";
import * as customerSchema from "./customer-schema";
import * as movieSchema from "./movie-schema";
import * as userSchema from "./user-schema";

export const RentalPurchaseDefinition = {
  movieId: movieSchema.RegistrantDefinition._id,
  chargedPrice: z.number(),
};

export const RentalCheckedInDefinition = {
  at: z.string().datetime(),
  byUserId: userSchema.RegistrantDefinition._id,
};

export const RentalCheckedOutDefinition = {
  ...RentalCheckedInDefinition,
  till: z.string().datetime(),
};

export const RegistrationForm = {
  customerId: customerSchema.RegistrantDefinition._id,
  purchases: z.object(RentalPurchaseDefinition).array().nonempty(),
  checkedOut: z.object(RentalCheckedInDefinition),
  checkedIn: z.object(RentalCheckedOutDefinition),
  chargedLateFee: z.number(),
};

export const CrossPatchDefinition = {
  ...RegistrationForm,
};

export const RegistrantDefinition = {
  ...CrossPatchDefinition,
  _id: zHexObjectId,
};

export const RegistrationSchema = z.object(RegistrationForm);
export const CrossPatchSchema = z.object(CrossPatchDefinition).partial();
export const RegistrantSchema = z.object(RegistrantDefinition).required();

export type RegistrationInput = z.TypeOf<typeof RegistrationSchema>;
export type CrossPatchInput = z.TypeOf<typeof CrossPatchSchema>;
export type RegistrantInput = z.TypeOf<typeof RegistrantSchema>;
