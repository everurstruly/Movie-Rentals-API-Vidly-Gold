import { faker } from "@faker-js/faker";
import { FakerSex, UserSeed } from "src/seed/seeder";
import { getDeferedIdFieldSeedValue } from "src/seed/utils";
import * as roleFactory from "./role-factory";

const MAX_QUANT_BASIC_USERS = 15;
const MAX_QUANT_SUPER_USERS = 5;

export const TOTAL_SEEDS_SIZE = MAX_QUANT_BASIC_USERS + MAX_QUANT_SUPER_USERS;

const userSuperRoleIndex = roleFactory.seeds.reduce(
  (superRoleIndex, role, roleIndex, roles) => {
    const superRole = roles[superRoleIndex];
    if (role.level > superRole.level) return roleIndex;
    return superRoleIndex;
  },
  0
);

const BASIC_ROLES = [...roleFactory.seeds];
const SUPER_ROLE = BASIC_ROLES.splice(userSuperRoleIndex, 1)[0];
const BASIC_USER_PASSWORD = "basicUserPassword";
const SUPER_USER_PASSWORD = "superUserPassword";

const DEFERED_SUPER_ROLE = getDeferedIdFieldSeedValue("title", SUPER_ROLE);
const DEFERED_BASIC_ROLES = BASIC_ROLES.map((basicRole) => {
  return getDeferedIdFieldSeedValue("title", basicRole);
});

const getFakeUserSeed = (
  seedIndex: number,
  readySeedData: Partial<UserSeed> = {}
) => {
  const isSuperuserSeed = seedIndex <= MAX_QUANT_SUPER_USERS;
  const gender = faker.name.sex() as FakerSex;
  const firstName = faker.name.firstName(gender);
  const lastName = faker.name.lastName(gender);

  return {
    firstName,
    lastName,
    dateOfBirth: faker.date.birthdate({ mode: "age", min: 14, max: 85 }),
    email: faker.internet.email(firstName, lastName),
    password: isSuperuserSeed ? SUPER_USER_PASSWORD : BASIC_USER_PASSWORD,
    isSuspended: false,
    assignedRolesIds: isSuperuserSeed
      ? [DEFERED_SUPER_ROLE]
      : faker.helpers.arrayElements(DEFERED_BASIC_ROLES),
    ...readySeedData,
  };
};

export const seeds = new Array(MAX_QUANT_BASIC_USERS)
  .fill(0)
  .map((_, index) => getFakeUserSeed(index));
