import { faker } from "@faker-js/faker";
import { getDeferedIdFieldSeedValue } from "src/seed/factories/factory-util";
import * as datesUtils from "src/common/utils/datatype/datetime-utils";
import * as customerFactory from "./customer-factory";
import * as movieFactory from "./movie-factory";
import * as userFactory from "./user-factory";

const TOTAL_SEEDS_SIZE = 10;

const DEFERED_CUSTOMERS = customerFactory.seeds.map((customer) => {
  return getDeferedIdFieldSeedValue("phoneNumber", customer);
});

const DEFERED_MOVIES = movieFactory.seeds.map((movie) => {
  return getDeferedIdFieldSeedValue("title", movie);
});

const DEFERED_USERS = userFactory.seeds.map((user) => {
  return getDeferedIdFieldSeedValue("email", user);
});

const getRentalSeed = () => {
  const checkOutDuration = "30d";
  const quantPurchased = faker.datatype.number({ min: 1, max: 10 });
  const maxChargedPrice = faker.datatype.number(100);
  const isCheckedBySingleUser = faker.datatype.boolean();
  const checkedOutByUserId = faker.helpers.arrayElement(DEFERED_USERS);
  const checkedOutAt = faker.date.betweens(
    "2022-07-01T00:00:00.000Z",
    new Date().toISOString(),
    1
  )[0];

  const checkedOutAt_ms = new Date(checkedOutAt).getTime();
  const checkedOutForDuration_ms =
    datesUtils.getMacroTimeAsMilliSeconds(checkOutDuration);

  const checkedOutTill_ms = checkedOutAt_ms + checkedOutForDuration_ms;
  const checkedOutTill = new Date(checkedOutTill_ms);
  const checkedInAt = faker.date.betweens(checkedOutAt, checkedOutTill, 1)[0];
  const didCheckInLate = checkedInAt > checkedOutTill;

  return {
    customerId: faker.helpers.arrayElement(DEFERED_CUSTOMERS),
    purchases: faker.helpers
      .arrayElements(DEFERED_MOVIES, quantPurchased)
      .map((dmv) => {
        return {
          movieId: dmv,
          chargedPrice: faker.datatype.number(maxChargedPrice),
        };
      }),
    checkedOut: {
      at: checkedOutAt,
      till: checkedOutTill,
      byUserId: checkedOutByUserId,
    },
    checkedIn: {
      at: checkedInAt,
      byUserId: isCheckedBySingleUser
        ? checkedOutByUserId
        : faker.helpers.arrayElement(DEFERED_USERS),
    },
    chargedLateFee: didCheckInLate
      ? faker.datatype.number(quantPurchased * (maxChargedPrice / 4))
      : 0,
  };
};

export const seeds = new Array(TOTAL_SEEDS_SIZE)
  .fill(0)
  .map(() => getRentalSeed());
