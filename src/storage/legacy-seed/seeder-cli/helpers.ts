import * as seeder from "src/seed/seeder";
import * as seedUtils from "src/seed/utils";
import * as seedErrors from "src/seed/errors";
import * as constants from "./constants";

export type CliSeederQueryOperations =
  typeof constants.queryInputOperations[number];

export type CliSeederQueryModelNames =
  | seeder.SeederModelNames
  | typeof constants.aliasForAllSeederModelsNames;

export type CliSeederQuery = {
  operation: CliSeederQueryOperations;
  envName: string;
  modelName: CliSeederQueryModelNames;
};

//

const getSeedDataFilePathBase = seedUtils.getFilePathBase("json");
const getSeedFactoryFilePathBase = seedUtils.getFilePathBase(
  constants.seedFactoryFileExtension
);

export const getSeedDataRequirableFilePath = (
  envName: string,
  modelName: string
) => {
  const env = seedUtils.getAsSeedSubFileNameFormat(envName);
  const model = seedUtils.getAsSeedSubFileNameFormat(modelName);
  if (!env || !model) throw new seedErrors.InvalidSeedFileNameError();
  const filePathBase = getSeedDataFilePathBase(`${model}-seeds`);
  return `src/seed/${env}/data/${filePathBase}`;
};

export const getRequirableSeedFactoryFilePath = (
  envName: string,
  modelName: string
) => {
  const env = seedUtils.getAsSeedSubFileNameFormat(envName);
  const model = seedUtils.getAsSeedSubFileNameFormat(modelName);
  if (!env || !model) throw new seedErrors.InvalidSeedFileNameError();
  const filePathBase = getSeedFactoryFilePathBase(`${model}-factory`);
  return `src/seed/${env}/factories/${filePathBase}`;
};

export const getRequirableSeedBackupFilePath = (
  envName: string,
  modelName: string,
  getFilePathOfFileToBackup: (envName: string, modelName: string) => string
) => {
  const env = seedUtils.getAsSeedSubFileNameFormat(envName);
  const model = seedUtils.getAsSeedSubFileNameFormat(modelName);
  if (!env || !model) throw new seedErrors.InvalidSeedFileNameError();
  const fileBase = seedUtils.getFilePathBase(
    constants.seedFactoryFileExtension
  )(getFilePathOfFileToBackup(envName, modelName));

  return `src/seed/${env}/factories-backup/${fileBase}`;
};

//

export const buildSeedFactory = async (envName: string, modelName: string) => {
  await seedUtils.putContentToFile({
    filePath: getRequirableSeedFactoryFilePath(envName, modelName),
    dataEncoding: "binary",
    content: constants.initSeedFactoryContent,
  });
};

export const includeSeedFactory = async (
  envName: string,
  modelName: string
) => {
  await seedUtils.patchContentToFile({
    filePath: getRequirableSeedFactoryFilePath(envName, modelName),
    dataEncoding: constants.seedDataEncoding,
  });
};

export const backupSeedFactory = async (envName: string, modelName: string) => {
  const factoryFileNameRetriver = getRequirableSeedFactoryFilePath;
  const contentToBackup = await seedUtils.readContentFromFile({
    filePath: factoryFileNameRetriver(envName, modelName),
    dataEncoding: "binary",
  });

  await seedUtils.putContentToFile({
    filePath: getRequirableSeedBackupFilePath(
      envName,
      modelName,
      factoryFileNameRetriver
    ),
    dataEncoding: "binary",
    content: contentToBackup,
  });
};

export const restoreSeedFactory = async (
  envName: string,
  modelName: string
) => {
  const factoryFileNameRetriver = getRequirableSeedFactoryFilePath;

  const backedupContents = await seedUtils.readContentFromFile({
    filePath: getRequirableSeedBackupFilePath(
      envName,
      modelName,
      factoryFileNameRetriver
    ),
    dataEncoding: "binary",
  });

  await seedUtils.putContentToFile({
    filePath: factoryFileNameRetriver(envName, modelName),
    dataEncoding: "binary",
    content: backedupContents,
  });
};

//

const readSeedData = (envName: string, modelName: string) => {
  return seedUtils.readContentFromFile({
    filePath: getSeedDataRequirableFilePath(envName, modelName),
    dataEncoding: constants.seedDataEncoding,
    mapToReadableContent: (content: any) => JSON.parse(JSON.parse(content)),
  });
};

const putSeedData = (envName: string, modelName: string, data: any) => {
  return seedUtils.putContentToFile({
    filePath: getSeedDataRequirableFilePath(envName, modelName),
    dataEncoding: constants.seedDataEncoding,
    content: JSON.stringify(data),
  });
};

export const insertSeedData = async (
  envName: string,
  ...modelNames: seeder.SeederModelNames[]
) => {
  for (const modelName of modelNames) {
    const { seeds = "" } = require(getRequirableSeedFactoryFilePath(
      envName,
      modelName
    ));

    await putSeedData(envName, modelName, seeds);
  }
};

export const upsertSeedData = async (
  envName: string,
  ...modelNames: seeder.SeederModelNames[]
) => {
  const modelToSeedMapping = {} as seeder.UpsertSeedArgs;
  for (const modelName of modelNames) {
    const data = await readSeedData(envName, modelName);
    modelToSeedMapping[modelName] = data;
  }

  await seeder.upsertSeeds(modelToSeedMapping);
};

export const deleteSeedData = async (
  ...modelNames: seeder.SeederModelNames[]
) => {
  const modelToSeedMapping = {} as seeder.DeleteSeedArgs;
  for (const modelName of modelNames) {
    modelToSeedMapping[modelName] = true;
  }

  await seeder.deleteSeeds(modelToSeedMapping);
};

//

const getOperation = (input: string) => {
  const [extractedOperation = ""] = input.split(":");
  const operation = extractedOperation.slice(2);
  if (!constants.queryInputOperations.includes(operation as any)) return null;
  return operation as CliSeederQueryOperations;
};

const getLocation = (input: string) => {
  const [_, location] = input.split(":");
  return location || "";
};

const getModel = (location: string) => {
  const [_, modelName] = location.split("/");
  if (!modelName) return constants.aliasForAllSeederModelsNames;
  return seeder.availableSeederModelNames.includes(modelName as any)
    ? (modelName as CliSeederQueryModelNames)
    : null;
};

const getEnvironment = (location: string) => {
  const [env] = location.split("/");
  return env ? env : constants.defaultEnvironment;
};

export const getSeederQueries = (inputQueries: string[]) => {
  const firstInputQueryIndex = 2;
  return inputQueries
    .slice(firstInputQueryIndex)
    .map((q) => q.trim())
    .filter((q) => q)
    .reduce((queries, input) => {
      const operation = getOperation(input);
      const location = getLocation(input);
      const modelName = getModel(location);
      if (!operation || !modelName) return queries;
      const envName = getEnvironment(location);
      queries.push({ operation, envName, modelName });
      return queries;
    }, [] as CliSeederQuery[]);
};

//

export const getSeederExecHelpMsg = (category: string) => {
  return `[HELP] seeder-task-execution ${category}: \n |`;
};

export const getCliUsageHelpMsg = () => {
  return `\
[INFO] Usage: seeder-cli.<file-extension> [options]
[HELP] Get other possible options using the "--help" option
  `;
};
