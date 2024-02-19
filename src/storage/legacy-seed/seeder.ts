// import {
//   Movie,
//   MovieModel,
//   MOVIE_MODEL_NAME,
// } from "src/app/models/movie-model";
// import { Role, RoleModel, ROLE_MODEL_NAME } from "src/app/models/role-model";
// import { User, UserModel, USER_MODEL_NAME } from "src/app/models/user-model";
// import {
//   ContentRating,
//   ContentRatingModel,
//   CONTENT_RATING_MODEL_NAME,
// } from "src/app/models/content-rating-model";
// import {
//   Customer,
//   CustomerModel,
//   CUSTOMER_MODEL_NAME,
// } from "src/app/models/customer-model";
// import {
//   Rental,
//   RentalCheckedIn,
//   RentalCheckedOut,
//   RentalModel,
//   RENTAL_MODEL_NAME,
// } from "src/app/models/rental-model";
// import startupDb from "src/startup/database";
// import * as objliteralUtils from "src/common/utils/object-literal-utils";

// const modelToSeederMapping = {
//   [CONTENT_RATING_MODEL_NAME]: seedContentRatingModel,
//   [MOVIE_MODEL_NAME]: seedMovieModel,
//   [CUSTOMER_MODEL_NAME]: seedCustomerModel,
//   [ROLE_MODEL_NAME]: seedRoleModel,
//   [USER_MODEL_NAME]: seedUserModel,
//   [RENTAL_MODEL_NAME]: seedRentalModel,
// } as const;

// export const availableSeederModelNames =
//   objliteralUtils.objectKeys(modelToSeederMapping);

// export type SeederModelNames = keyof typeof modelToSeederMapping;
// export type UpsertSeedArgs = Partial<{
//   [MOVIE_MODEL_NAME]: Parameters<
//     typeof modelToSeederMapping[typeof MOVIE_MODEL_NAME]
//   >[0];
//   [CUSTOMER_MODEL_NAME]: Parameters<
//     typeof modelToSeederMapping[typeof CUSTOMER_MODEL_NAME]
//   >[0];
//   [ROLE_MODEL_NAME]: Parameters<
//     typeof modelToSeederMapping[typeof ROLE_MODEL_NAME]
//   >[0];
//   [USER_MODEL_NAME]: Parameters<
//     typeof modelToSeederMapping[typeof USER_MODEL_NAME]
//   >[0];
//   [RENTAL_MODEL_NAME]: Parameters<
//     typeof modelToSeederMapping[typeof RENTAL_MODEL_NAME]
//   >[0];
//   [CONTENT_RATING_MODEL_NAME]: Parameters<
//     typeof modelToSeederMapping[typeof CONTENT_RATING_MODEL_NAME]
//   >[0];
// }>;

// export type DeleteSeedArgs = { [K in keyof UpsertSeedArgs]: boolean };

// const defaultUpsertSeedArgs = availableSeederModelNames.reduce(
//   (defaultArgs, modelName) => {
//     defaultArgs[modelName as SeederModelNames] = undefined;
//     return defaultArgs as UpsertSeedArgs;
//   },
//   {} as UpsertSeedArgs
// );

// const defaultDeleteSeedArgs = availableSeederModelNames.reduce(
//   (defaultArgs, modelName) => {
//     defaultArgs[modelName as SeederModelNames] = true;
//     return defaultArgs;
//   },
//   {} as Required<DeleteSeedArgs>
// );

// export async function upsertSeeds(modelToSeedMappingArg: UpsertSeedArgs) {
//   const dbInstance = await startupDb();
//   console.log("Connected to DB");

//   const modelToSeedMapping = {
//     ...defaultUpsertSeedArgs,
//     ...modelToSeedMappingArg,
//   };

//   for (const modelName in modelToSeedMapping) {
//     const typedModelName = modelName as SeederModelNames;
//     const seeds = modelToSeedMapping[typedModelName];
//     if (modelToSeedMapping[typedModelName]) {
//       await (modelToSeederMapping[typedModelName] as any)(seeds);
//     }
//   }

//   console.log("Done! seeding database");
//   await dbInstance.disconnect();
// }

// export async function deleteSeeds(modelToSeedMappingArg: DeleteSeedArgs) {
//   const dbInstance = await startupDb();
//   console.log("Connected to DB");

//   const modelToSeedMapping = {
//     ...defaultDeleteSeedArgs,
//     ...modelToSeedMappingArg,
//   };

//   for (const modelName in modelToSeedMapping) {
//     const typedModelName = modelName as SeederModelNames;
//     if (modelToSeedMapping[typedModelName]) {
//       await modelToSeederMapping[typedModelName]([]);
//     }
//   }

//   console.log("Done! seeding database");
//   await dbInstance.disconnect();
// }

// export type ObjectIdString = string;
// export type DeferedSeedField<T> =
//   | T
//   | {
//       fillBy: { [field: string]: any };
//       subWith: T;
//     };

// export interface ContentRatingSeed extends ContentRating {}
// export interface MovieSeed extends Movie {}
// export interface CustomerSeed extends Customer {}
// export interface RoleSeed extends Role {}
// export interface UserSeed extends Omit<User, "assignedRolesIds"> {
//   assignedRolesIds: ObjectIdString[] | DeferedSeedField<ObjectIdString>[];
// }

// export interface RentalCheckedInSeed extends Omit<RentalCheckedIn, "byUserId"> {
//   byUserId: DeferedSeedField<ObjectIdString>;
// }

// export interface RentalCheckedOutSeed
//   extends Omit<RentalCheckedOut, "byUserId"> {
//   byUserId: DeferedSeedField<ObjectIdString>;
// }

// export interface RentalSeed
//   extends Omit<
//     Rental,
//     "customerId" | "purchases" | "checkedOut" | "checkedIn"
//   > {
//   customerId: DeferedSeedField<ObjectIdString>;
//   purchases: {
//     movieId: DeferedSeedField<ObjectIdString>;
//     chargedPrice: number;
//   }[];
//   checkedOut: RentalCheckedOutSeed;
//   checkedIn: RentalCheckedInSeed;
//   chargedLateFee: number;
// }

// async function seedContentRatingModel(seeds: ContentRatingSeed[]) {
//   await ContentRatingModel.deleteMany({});
//   await ContentRatingModel.create(seeds);
// }

// async function seedRoleModel(seeds: RoleSeed[]) {
//   await RoleModel.deleteMany({});
//   await RoleModel.create(seeds);
// }

// async function seedMovieModel(seeds: MovieSeed[]) {
//   await MovieModel.deleteMany({});
//   await MovieModel.create(seeds);
// }

// async function seedCustomerModel(seeds: CustomerSeed[]) {
//   await CustomerModel.deleteMany({});
//   await CustomerModel.create(seeds);
// }

// async function seedUserModel(seeds: UserSeed[]) {
//   await UserModel.deleteMany({});

//   for (let deferredSeed of seeds) {
//     const seed = { ...deferredSeed };
//     const { assignedRolesIds } = seed;

//     if (typeof assignedRolesIds[0] === "object") {
//       const fulfilledAssignedRolesIds = await Promise.all(
//         assignedRolesIds.map(async (role) => {
//           if (typeof role === "string") return role;
//           const { fillBy, subWith } = role;
//           const roleInDb = await RoleModel.getOne(fillBy);
//           return roleInDb ? roleInDb._id.toString() : subWith;
//         })
//       );

//       seed.assignedRolesIds = fulfilledAssignedRolesIds;
//     }

//     await UserModel.create(seed);
//   }
// }

// async function seedRentalModel(seeds: RentalSeed[]) {
//   await RentalModel.deleteMany({});

//   for (let deferredSeed of seeds) {
//     const seed = { ...deferredSeed };
//     if (typeof seed.customerId === "object") {
//       const { fillBy, subWith } = seed.customerId;
//       const customerInDb = await CustomerModel.getOne(fillBy);
//       const id = customerInDb ? customerInDb._id : subWith;
//       seed.customerId = id.toString();
//     }

//     const { purchases } = seed;
//     if (typeof purchases[0].movieId === "object") {
//       const purchaseMappedToDoc = await Promise.all(
//         [...purchases].map(async (pch) => {
//           if (typeof pch.movieId === "string") return pch;
//           const { fillBy, subWith } = pch.movieId;
//           const movieInDb = await MovieModel.getOne(fillBy);
//           const id = movieInDb ? movieInDb._id : subWith;
//           pch.movieId = id.toString();
//           return pch;
//         })
//       );

//       seed.purchases = purchaseMappedToDoc;
//     }

//     const { checkedOut, checkedIn } = seed;
//     if (typeof checkedOut.byUserId === "object") {
//       const { fillBy, subWith } = checkedOut.byUserId;
//       const userInDb = await UserModel.getOne(fillBy);
//       const id = userInDb ? userInDb._id : subWith;
//       checkedOut.byUserId = id.toString();

//       if (
//         userInDb &&
//         typeof checkedIn.byUserId !== "string" &&
//         subWith === checkedIn.byUserId.subWith
//       ) {
//         checkedIn.byUserId = id.toString();
//       }
//     }

//     if (typeof checkedIn.byUserId === "object") {
//       const { fillBy, subWith } = checkedIn.byUserId;
//       const userInDb = await UserModel.getOne(fillBy);
//       const id = userInDb ? userInDb._id : subWith;
//       checkedIn.byUserId = id.toString();
//     }

//     await RentalModel.create(seed);
//   }
// }
