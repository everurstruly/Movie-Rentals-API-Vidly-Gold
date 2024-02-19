import { MovieDocument, MovieModel } from "src/core/models/movie-model";

export interface MovieSeed extends MovieDocument {}

export const seedMovieModel = async (seeds: MovieSeed[]) => {
  await MovieModel.deleteMany({});
  await MovieModel.create(seeds);
};
