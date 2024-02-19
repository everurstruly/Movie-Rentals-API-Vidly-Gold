import * as objectIdParamValidator from 'src/core/middleware/validation/objectid-param-validator';
import * as reqSchemaValidator from 'src/core/middleware/validation/request-schema-validator';
import * as reqTokenVerifier from 'src/core/middleware/validation/request-jwt-verificator';
import * as httpDataFormatter from 'src/core/middleware/proj/http-response-formatter';

declare global {
  namespace Express {
    export interface Request {
      locals: {
        [key: string]: unknown;
        jwtVerification: reqTokenVerifier.VerificationResult;
        resourceValidation: reqSchemaValidator.ValidationResult;
        objectIdParamsValidation: objectIdParamValidator.ValidationResult;
      };
    }

    export interface Response {
      kit: {
        [key: string]: any;
        formatter: httpDataFormatter.HttpResponseFormatters;
      };
    }
  }
}
