import mongoose from 'mongoose';

export const CUSTOMER_MODEL_NAME = 'Customer';
export const CUSTOMER_MEMBERSHIPS = [
  'Basic',
  'Gold',
  'Premium',
  'Diamond',
] as const;

export type CustomerMembership = typeof CUSTOMER_MEMBERSHIPS[number];

export interface CustomerDocument {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  phoneNumber: string;
  membership?: CustomerMembership;
  isBanned: boolean;
}

const customerSchema = new mongoose.Schema<CustomerDocument>({
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
  phoneNumber: {
    type: String,
    required: true,
  },
  membership: {
    type: String,
    enum: [...CUSTOMER_MEMBERSHIPS],
    default: 'Basic',
  },
  isBanned: {
    type: Boolean,
    default: false,
  },
});

export const CustomerModel = mongoose.model<CustomerDocument>(
  CUSTOMER_MODEL_NAME,
  customerSchema
);
