import {
  ContentRatingDocument,
  ContentRatingModel,
} from "src/core/models/content-rating-model";

export interface ContentRatingSeed extends ContentRatingDocument {}

export const seedContentRatingModel = async (seeds: ContentRatingSeed[]) => {
  await ContentRatingModel.deleteMany({});
  await ContentRatingModel.create(seeds);
};
