import * as jwt from 'jsonwebtoken';

export const getJwtClientErrorMessage = (error: any) => {
  let message = 'possibly malformed or contains invalid details';
  if (error instanceof jwt.TokenExpiredError) {
    message = 'is expired';
  } else if (error instanceof jwt.NotBeforeError) {
    message = 'support for token-utilization is discontinued';
  }

  return message;
};
