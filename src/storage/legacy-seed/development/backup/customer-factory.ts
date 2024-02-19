import { faker, SexType } from "@faker-js/faker";
import { CUSTOMER_MEMBERSHIPS } from "src/app/models/customer-model";

export const TOTAL_SEEDS_SIZE = 22;

const getCustomerSeed = () => {
  const gender = faker.name.sex() as SexType;

  return {
    firstName: faker.name.firstName(gender),
    lastName: faker.name.lastName(gender),
    dateOfBirth: faker.date.birthdate({ mode: "age", min: 3, max: 99 }),
    phoneNumber: faker.phone.number(),
    membership: faker.helpers.arrayElement(CUSTOMER_MEMBERSHIPS),
    isBanned: false,
  };
};

export const seeds = new Array(TOTAL_SEEDS_SIZE)
  .fill(0)
  .map((item) => getCustomerSeed());
