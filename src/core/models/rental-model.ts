import mongoose from 'mongoose';
import { MOVIE_MODEL_NAME } from './movie-model';
import { CUSTOMER_MODEL_NAME } from './customer-model';
import { USER_MODEL_NAME } from './user-model';

export const RENTAL_MODEL_NAME = 'Rental';

export interface RentalPurchase {
  movieId: mongoose.Types.ObjectId;
  price: number;
}

export interface RentalCheckOut {
  at: Date;
  till: Date;
  byUserId: mongoose.Types.ObjectId;
}

export interface RentalCheckIn extends Omit<RentalCheckOut, 'at' | 'till'> {
  at?: Date;
}

export interface RentalCharges {
  ovedueReturn: { fee: number };
}

export interface RentalDocument {
  _id: mongoose.Types.ObjectId;
  customerId: mongoose.Types.ObjectId;
  purchases: RentalPurchase[];
  charges: RentalCharges;
  checkIn: RentalCheckOut;
  checkOut: RentalCheckIn;
}

const rentalScheam = new mongoose.Schema<RentalDocument>({
  customerId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: CUSTOMER_MODEL_NAME,
    required: true,
  },
  purchases: [
    {
      movieId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: MOVIE_MODEL_NAME,
      },
      price: {
        type: Number,
        required: true,
        min: 0,
      },
    },
  ],
  charges: {
    ovedueReturn: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  checkIn: {
    at: {
      type: Date,
      immutable: true,
      default: () => Date.now(),
    },
    till: Date,
    byUserId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: USER_MODEL_NAME,
    },
  },
  checkOut: {
    at: Date,
    byUserId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: USER_MODEL_NAME,
    },
  },
});

export const RentalModel = mongoose.model<RentalDocument>(
  RENTAL_MODEL_NAME,
  rentalScheam
);
