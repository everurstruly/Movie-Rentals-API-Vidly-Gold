import mongoose from 'mongoose';

export const JWT_SESSION_MODEL_NAME = 'TokenSession';

export interface JwtSessionDocument {
  _id: mongoose.Types.ObjectId;
  clientId: string;
  subject: string;
  accessToken: string;
  refreshToken: string;
  refreshTokenFamily: string[];
}

const jwtSessionSchema = new mongoose.Schema<JwtSessionDocument>({
  clientId: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 128,
  },
  subject: {
    type: String,
    immutable: true,
    required: true,
    minlength: 2,
    max: 28,
  },
  accessToken: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
  refreshTokenFamily: {
    type: [String],
    default: () => [],
  },
});

export const JwtSessionModel = mongoose.model<JwtSessionDocument>(
  JWT_SESSION_MODEL_NAME,
  jwtSessionSchema
);
