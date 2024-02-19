import mongoose from "mongoose";
import { CONTENT_RATING_MODEL_NAME } from "./content-rating-model";

export const MOVIE_MODEL_NAME = "Movie";
export const MOVIE_GENRES = [
  "Action",
  "Comedy",
  "Thriller",
  "Cartoon",
  "Romance",
  "Anime",
] as const;

export type MovieGenre = typeof MOVIE_GENRES[number];

export interface MovieDocument {
  _id: mongoose.Types.ObjectId;
  title: string;
  genres: MovieGenre[];
  quantityInStock: number;
  contentRatingId: mongoose.Types.ObjectId;
}

interface MovieModel extends MovieDocument {
  isAppropriateContent(
    movieId: mongoose.Types.ObjectId,
    consumerAge: number
  ): false;
}

const movieSchema = new mongoose.Schema<MovieModel>({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 2,
    maxlength: 255,
  },
  genres: {
    type: [String],
    enum: [...MOVIE_GENRES],
    min: 1,
  },
  contentRatingId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: CONTENT_RATING_MODEL_NAME,
    required: true,
  },
  quantityInStock: {
    type: Number,
    min: 0,
  },
});

movieSchema.static(
  "isAppropriateContent",
  async function (
    movieId: mongoose.Types.ObjectId,
    consumerAge: number
  ): Promise<boolean> {
    const movie = await this.getOne({ _id: movieId }).populate(
      "contentRatingId"
    );

    const { contentRatingId: contentRating } = movie;
    return consumerAge < contentRating.ageSuitableFor ? true : false;
  }
);

export const MovieModel = mongoose.model<MovieDocument>(
  MOVIE_MODEL_NAME,
  movieSchema
);
