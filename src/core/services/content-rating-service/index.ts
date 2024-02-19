import {
  ContentRatingDocument,
  ContentRatingModel,
} from 'src/core/models/content-rating-model';
import * as mongooseRepositoryCreator from 'src/core/services/_repository/mongoose-adapter';

export type ContentRatingId = string;
export type ContentRatingDto = Omit<ContentRatingDocument, '_id'>;

const ContentRatingRepository = mongooseRepositoryCreator.CreateRepository<
  ContentRatingDto,
  ContentRatingDocument
>(ContentRatingModel);

class ContentRatingService extends ContentRatingRepository {}
