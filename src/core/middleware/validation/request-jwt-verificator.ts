import asyncMiddleware from 'src/core/middleware/shared/async-middleware';
import * as jwt from 'jsonwebtoken';
import * as objliteralUtils from 'src/common/utils/datatype/object-literal-utils';
import * as httpHeaderUtils from 'src/common/utils/http-context/headers';
import { Request } from 'express';
import { UnauthorizedErrorBuilder } from 'src/core/errors/http-errors';

export const defaultOptions = {
  verificationName: 'user',
  verificationResultLocation: 'locals.jwtVerification',
  shouldThrowVerificationError: true,
  verificationOptions: {
    algorithms: ['HS256'] as jwt.Algorithm[],
    audience: undefined as string | RegExp | Array<string | RegExp> | undefined,
    complete: false, // if <true> return decoded-result as object: { payload, header, signature } else return only the usual content of the payload. */
    issuer: undefined as string | string[] | undefined,
    ignoreExpiration: false,
    ignoreNotBefore: false,
  },
  getSecret: () => 'secret',
  getTokenToVerify: (req: Request) => {
    return httpHeaderUtils.findAuthorizationToken(
      req.header('authorization'),
      'bearer'
    );
  },
};

export type DefaultOptions = typeof defaultOptions;
export type VerificationResult = {
  [name: DefaultOptions['verificationName']]: {
    tokenType: string | null;
    tokenPayload: any;
  } & (
    | {
        isVerified: false;
        tokenValue: null | string;
      }
    | {
        isVerified: true;
        tokenValue: string;
      }
  );
};

export const verifyRequestToken = (
  options: WithRequired<Partial<DefaultOptions>, 'getSecret'>
) => {
  return asyncMiddleware(async (req, res, next) => {
    const {
      verificationName,
      verificationOptions,
      verificationResultLocation,
      shouldThrowVerificationError,
      getSecret,
      getTokenToVerify,
    } = objliteralUtils.updateOneByOther(defaultOptions, options, false);

    const tokenToVerify = getTokenToVerify(req);
    if (tokenToVerify === null) {
      return {
        isVerified: false,
        tokenType: null,
        tokenValue: null,
        tokenPayload: null,
      } as VerificationResult[number];
    }

    const verificationResult = {
      tokenType: tokenToVerify.type,
      tokenValue: tokenToVerify.value,
    } as VerificationResult[number];

    try {
      const payload = jwt.verify(
        tokenToVerify.value,
        getSecret(),
        verificationOptions
      );

      verificationResult.isVerified = true;
      verificationResult.tokenPayload = payload;
    } catch (error: any) {
      if (!(error instanceof jwt.JsonWebTokenError)) throw error;

      verificationResult.isVerified = false;
      verificationResult.tokenPayload = jwt.decode(tokenToVerify.value);
      const verificationError = UnauthorizedErrorBuilder();

      if (error instanceof jwt.TokenExpiredError) {
        verificationError.addIssues((iss) => {
          return iss.expired({
            source: { content: 'jwt' },
            value: tokenToVerify.raw,
            reason: 'token expired',
          });
        });
      } else if (error instanceof jwt.NotBeforeError) {
        verificationError.addIssues((iss) => {
          return iss.inActive({
            source: { content: 'jwt' },
            value: tokenToVerify.raw,
            reason: 'support for token-utilization is discontinued',
          });
        });
      }

      verificationError.addIssues((iss) => {
        return iss.unauthorized({
          source: { content: 'jwt' },
          value: tokenToVerify.raw,
          reason: 'possibly malformed or contains invalid details',
        });
      });

      if (shouldThrowVerificationError) {
        throw verificationError.use();
      }
    } finally {
      objliteralUtils.setValueByPaths(
        req,
        [verificationResultLocation, verificationName],
        verificationResult
      );
    }

    return next();
  });
};
