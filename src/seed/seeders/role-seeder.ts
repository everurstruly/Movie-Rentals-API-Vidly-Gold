import { Role, RoleModel } from "src/core/models/role-model";

export interface RoleSeed extends Role {}

export const seedRoleModel = async (seeds: RoleSeed[]) => {
  await RoleModel.deleteMany({});
  await RoleModel.create(seeds);
};
