import { z } from 'zod';

export const AccessSessionCredentialsDefinition = {
  clientId: z.string(),
  subject: z.string(),
  accessToken: z.string(),
};

export const OpenSessionCredentialsDefinition = {
  refreshToken: z.string(),
  ...AccessSessionCredentialsDefinition,
};

export const RefreshSessionCredentialsDefinition = {
  ...OpenSessionCredentialsDefinition,
  currentRefreshToken: z.string(),
};

//

export const AccessSessionCredentialsSchema = z
  .object(AccessSessionCredentialsDefinition)
  .strict();

export const OpenSessionCredentialsSchema = z
  .object(OpenSessionCredentialsDefinition)
  .strict();

export const RefreshSessionCredentialsSchema = z
  .object(RefreshSessionCredentialsDefinition)
  .strict();

//

export type AccessSessionCredentialsInput = z.TypeOf<
  typeof AccessSessionCredentialsSchema
>;

export type OpenSessionCredentialsInput = z.TypeOf<
  typeof OpenSessionCredentialsSchema
>;

export type RefreshSessionCredentialsInput = z.TypeOf<
  typeof RefreshSessionCredentialsSchema
>;
