import mongoose from 'mongoose';
import { ROLE_MODEL_NAME } from './role-model';

export const USER_MODEL_NAME = 'User';

export interface UserDocument {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  email: string;
  password: string;
  isSuspended?: boolean;
  assignedRolesIds: mongoose.Types.ObjectId[];
}

const userSchema = new mongoose.Schema<UserDocument>({
  firstName: {
    type: String,
    lowercase: true,
    required: true,
    maxLength: 255,
  },
  lastName: {
    type: String,
    lowercase: true,
    required: true,
    maxLength: 255,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 12,
    maxLength: 255,
  },
  assignedRolesIds: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: ROLE_MODEL_NAME,
    required: true,
    min: 1,
  },
  isSuspended: {
    type: Boolean,
    default: false,
  },
});

export const UserModel = mongoose.model<UserDocument>(
  USER_MODEL_NAME,
  userSchema
);
