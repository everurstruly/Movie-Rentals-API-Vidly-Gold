import { MovieDocument, MovieModel } from 'src/core/models/movie-model';
import * as mongooseRepositoryCreator from 'src/core/services/_repository/mongoose-adapter';

export type MovieId = string;
export type MovieDto = Omit<MovieDocument, '_id'>;

const MovieRepository = mongooseRepositoryCreator.CreateRepository<
  MovieDto,
  MovieDocument
>(MovieModel);

class MovieService extends MovieRepository {}
