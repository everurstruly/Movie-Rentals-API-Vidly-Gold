// import * as seeder from "src/seed/seeder";
// import * as constants from "./constants";
// import * as helpers from "./helpers";

// (async function () {
//   try {
//     if (process.argv.includes("--help")) {
//       console.log(
//         helpers.getSeederExecHelpMsg("query-format"),
//         constants.queryInputFormat,
//         "\n"
//       );

//       console.log(
//         helpers.getSeederExecHelpMsg("available-operations"),
//         constants.queryInputOperations,
//         "\n"
//       );

//       console.log(
//         helpers.getSeederExecHelpMsg("model-names"),
//         seeder.availableSeederModelNames,
//         "\n"
//       );

//       process.exit(1);
//     }

//     if (process.argv.includes("factory")) {
//       if (process.argv.includes("--restore")) {
//         console.log("♻ Restoring factories...");
//         for (const modelName of seeder.availableSeederModelNames) {
//           await helpers.restoreSeedFactory(
//             constants.defaultEnvironment,
//             modelName
//           );
//         }

//         console.log("✅ Done! Restoring factories  ");
//         process.exit(1);
//       }

//       if (process.argv.includes("--build")) {
//         console.log("🚧 Building factories ...");
//         for (const modelName of seeder.availableSeederModelNames) {
//           await helpers.backupSeedFactory(
//             constants.defaultEnvironment,
//             modelName
//           );

//           console.log(`♻ Backedup [${modelName}] factory...`);
//           await helpers.buildSeedFactory(
//             constants.defaultEnvironment,
//             modelName
//           );
//         }

//         console.log("✅ Done! Building factories");
//         process.exit(1);
//       }

//       if (process.argv.includes("--open")) {
//         console.log("🚧 Opening factories...");
//         for (const modelName of seeder.availableSeederModelNames) {
//           await helpers.includeSeedFactory(
//             constants.defaultEnvironment,
//             modelName
//           );
//         }

//         console.log("✅ Done! Opening up factories");
//         process.exit(1);
//       }
//     }

//     for (const query of helpers.getSeederQueries(process.argv)) {
//       const { operation, envName, modelName } = query;
//       const availableSeederModelNames_T =
//         seeder.availableSeederModelNames as seeder.SeederModelNames[];

//       if (operation === "insert") {
//         console.log("🚧 Creating seeds...");
//         if (modelName !== constants.aliasForAllSeederModelsNames) {
//           await helpers.insertSeedData(envName, modelName);
//           console.log("✅ Done! Creating seeds for the database");
//           process.exit(1);
//         }

//         await helpers.insertSeedData(envName, ...availableSeederModelNames_T);
//         console.log("✅ Done! Creating seeds for the database");
//         process.exit(1);
//       }

//       if (operation === "upsert") {
//         console.log("🚧 Uploading seeds...");
//         if (modelName !== constants.aliasForAllSeederModelsNames) {
//           await helpers.upsertSeedData(envName, modelName);
//           console.log("✅ Done! Uploading data to the database");
//           process.exit(1);
//         }

//         await helpers.upsertSeedData(envName, ...availableSeederModelNames_T);
//         console.log("✅ Done! Uploading data to the database");
//         process.exit(1);
//       }

//       if (operation === "delete") {
//         console.log("🚧 Deleting seeds...");
//         if (modelName !== constants.aliasForAllSeederModelsNames) {
//           await helpers.deleteSeedData(modelName);
//           console.log("✅ Done! Erasing data in the Database.");
//           process.exit(1);
//         }

//         await helpers.deleteSeedData(...availableSeederModelNames_T);
//         console.log("✅ Done! Erasing data in the Database.");
//         process.exit(1);
//       }
//     }

//     console.log(helpers.getCliUsageHelpMsg());
//     process.exit(1);
//   } catch (error: any) {
//     console.log(error);
//     console.log("[ERROR] at seeder-cli: ", error.name, error.message);
//   }
// })();
