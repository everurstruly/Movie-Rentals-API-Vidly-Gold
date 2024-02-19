import config from "src/common/extensions/ext-config";

export const seedFactoryFileExtension = "ts";
export const initSeedFactoryContent = `export const seeds = [];`;
export const seedDataEncoding = "utf-8";

export const oneQueryInput = `--<operation>[:<environment-name>[/<model-name>]]`;
export const queryInputFormat = `${oneQueryInput} [${oneQueryInput}]`;

export const defaultEnvironment = config.util.getEnv("NODE_CONFIG_ENV");

export const aliasForAllSeederModelsNames = "all";
export const queryInputOperations = ["insert", "upsert", "delete"] as const;
