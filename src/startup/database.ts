import mongoose from 'mongoose';
import * as mainConfigUtils from 'config/utils';

export const startupDb = async () => {
  mongoose.set('strictQuery', false);
  return mongoose.connect(mainConfigUtils.getDbUri());
};
