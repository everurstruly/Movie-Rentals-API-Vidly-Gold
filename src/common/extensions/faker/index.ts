import { faker } from "@faker-js/faker";

export const getFakeMovieTitle = () => {
  const title = `${faker.music.songName()} ${faker.random.word()}`;
  return title.split("' ").join("");
};

const film = {
  movieTitle() {
    return getFakeMovieTitle();
  },
};

export const fakerExtension = { film };