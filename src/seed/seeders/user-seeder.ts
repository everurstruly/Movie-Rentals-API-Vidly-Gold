import { RoleModel } from "src/core/models/role-model";
import { UserDocument, UserModel } from "src/core/models/user-model";
import { DeferedSeedField, ObjectIdString } from "./shared/types";

export interface UserSeed extends Omit<UserDocument, "assignedRolesIds"> {
  assignedRolesIds: ObjectIdString[] | DeferedSeedField<ObjectIdString>[];
}

export const seedUserModel = async (seeds: UserSeed[]) => {
  await UserModel.deleteMany({});

  for (let deferredSeed of seeds) {
    const seed = { ...deferredSeed };
    const { assignedRolesIds } = seed;

    if (typeof assignedRolesIds[0] === "object") {
      const fulfilledAssignedRolesIds = await Promise.all(
        assignedRolesIds.map(async (role) => {
          if (typeof role === "string") return role;
          const { fillBy, subWith } = role;
          const roleInDb = await RoleModel.getOne(fillBy);
          return roleInDb ? roleInDb._id.toString() : subWith;
        })
      );

      seed.assignedRolesIds = fulfilledAssignedRolesIds;
    }

    await UserModel.create(seed);
  }
};
