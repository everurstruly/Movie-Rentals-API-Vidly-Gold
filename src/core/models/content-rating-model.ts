import * as mongoose from 'mongoose';

export const CONTENT_RATING_MODEL_NAME = 'ContentRating';

export interface ContentRatingDocument {
  _id: mongoose.Types.ObjectId;
  title: string;
  ageSuitableFor: number;
  description?: string;
  isDiscontinued: boolean;
}

const contentRatingSchema = new mongoose.Schema<ContentRatingDocument>({
  title: {
    type: String,
  },
  ageSuitableFor: {
    type: Number,
    min: 0,
    default: 0,
  },
  description: {
    type: String,
    minLength: 2,
    default: function (this: ContentRatingDocument) {
      return `Not suitable for Individuals under the age of ${this.ageSuitableFor}`;
    },
  },
  isDiscontinued: {
    type: Boolean,
    default: false,
  },
});

export const ContentRatingModel = mongoose.model<ContentRatingDocument>(
  CONTENT_RATING_MODEL_NAME,
  contentRatingSchema
);
