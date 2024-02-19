import mongoose from "mongoose";

export const ROLE_MODEL_NAME = "Role";

export interface RoleDocument {
  _id: mongoose.Types.ObjectId;
  title: string;
  level: number;
}

const roleSchema = new mongoose.Schema<RoleDocument>({
  title: {
    type: String,
    require: true,
    unique: true,
    minLength: 2,
    maxLength: 255,
  },
  level: {
    type: Number,
    required: true,
    min: 0,
  },
});

export const RoleModel = mongoose.model<RoleDocument>(
  ROLE_MODEL_NAME,
  roleSchema
);
