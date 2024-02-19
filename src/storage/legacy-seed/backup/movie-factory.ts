import { faker } from "@faker-js/faker";
import { fakerExtension } from "src/common/extensions/faker";
import { MOVIE_GENRES } from "src/core/models/movie-model";
import * as contentRatingFactory from "./contentrating-factory";

export const TOTAL_SEEDS_SIZE = 20;

const getMovieSeed = () => {
  return {
    title: fakerExtension.film.movieTitle(),
    genres: faker.helpers.arrayElements(MOVIE_GENRES),
    quantityInStock: faker.datatype.number(100),
    contentRatingId: faker.helpers.arrayElement(contentRatingFactory.seeds),
  };
};

export const seeds = new Array(TOTAL_SEEDS_SIZE)
  .fill(0)
  .map(() => getMovieSeed());
