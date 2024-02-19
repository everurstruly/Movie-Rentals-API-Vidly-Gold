import { faker, fakerExtended } from "src/lib/extended/@faker-js/faker";
import { MOVIE_GENRES } from "src/app/models/movie-model";
import * as contentRatingFactory from "./contentrating-factory";

export const TOTAL_SEEDS_SIZE = 20;

const getMovieSeed = () => {
  return {
    title: fakerExtended.film.movieTitle(),
    genres: faker.helpers.arrayElements(MOVIE_GENRES),
    quantityInStock: faker.datatype.number(100),
    contentRatingId: faker.helpers.arrayElement(contentRatingFactory.seeds),
  };
};

export const seeds = new Array(TOTAL_SEEDS_SIZE)
  .fill(0)
  .map(() => getMovieSeed());
