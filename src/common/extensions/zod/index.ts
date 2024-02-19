import mongoose from 'mongoose';
import { z } from 'zod';

export const zExtension = {
  ObjectId() {
    return z.instanceof(mongoose.Types.ObjectId);
  },

  HexObjectId() {
    const issue = { message: 'Invalid HexObjectId' };
    return z.custom<string>((data) => {
      return mongoose.isObjectIdOrHexString(data);
    }, issue);
  },
};
