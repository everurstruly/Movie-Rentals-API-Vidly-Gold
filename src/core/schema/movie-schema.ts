import { z } from "zod";
import { zHexObjectId } from "./shared-schema";
import { MOVIE_GENRES } from "src/core/models/movie-model";

export const RegistrationForm = {
  title: z.string(),
  genres: z.enum(MOVIE_GENRES),
  quantityInStock: z.number().min(0),
  contentRatingId: zHexObjectId,
};

export const CrossPatchDefinition = {
  ...RegistrationForm,
  isBanned: z.boolean(),
};

export const RegistrantDefinition = {
  ...CrossPatchDefinition,
  _id: zHexObjectId,
};

export const RegistrationSchema = z.object(RegistrationForm);
export const CrossPatchSchema = z.object(CrossPatchDefinition).optional();
export const RegistrantSchema = z.object(RegistrantDefinition).required();

export type RegistrationInput = z.TypeOf<typeof RegistrationSchema>;
export type CrossPatchInput = z.TypeOf<typeof CrossPatchSchema>;
export type RegistrantInput = z.TypeOf<typeof RegistrantSchema>;
