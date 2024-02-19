import { faker } from "@faker-js/faker";
import * as fs from "fs";
import * as path from "path";

export const getSeedDeferedMonoValueField = (
  valueToSubWIth: any,
  dataToFillFrom: { [key: string]: any },
  fieldToFillBy: string
) => {
  return {
    fillBy: { [fieldToFillBy]: dataToFillFrom[fieldToFillBy] },
    subWith: valueToSubWIth,
  };
};

type DeferedMonoValueFieldArgs = Parameters<
  typeof getSeedDeferedMonoValueField
>;

export const getDeferedIdFieldSeedValue = (
  fillBy: DeferedMonoValueFieldArgs[2],
  fillFromData: DeferedMonoValueFieldArgs[1]
) => {
  return getSeedDeferedMonoValueField(
    faker.database.mongodbObjectId(),
    fillFromData,
    fillBy
  );
};

export const getAsSeedSubFileNameFormat = (name: string) => {
  return name.trim().toLowerCase().split(" ").join("");
};

export const getFilePathBase = (extension: string) => {
  return (filePath: string) => {
    const filePathName = `${filePath}.${extension}`;
    const filePathObj = path.parse(filePath);
    return filePathObj.ext ? filePathObj.base : filePathName;
  };
};

export const patchContentToFile = async (options: {
  filePath: string;
  dataEncoding?: fs.WriteFileOptions;
  content?: any;
  mapToWritableContent?: (content: any) => any;
}) => {
  const {
    filePath,
    dataEncoding = "utf-8",
    content = "",
    mapToWritableContent = (content) => content,
  } = options;

  const folderPath = path.dirname(filePath);
  if (!fs.existsSync(folderPath)) {
    await fs.promises.mkdir(folderPath, { recursive: true });
  }

  fs.appendFileSync(filePath, mapToWritableContent(content), dataEncoding);
};

export const putContentToFile = async (options: {
  filePath: string;
  dataEncoding?: fs.WriteFileOptions;
  content?: any;
  mapToWritableContent?: (content: any) => any;
}) => {
  const {
    filePath,
    dataEncoding = "utf-8",
    content = "",
    mapToWritableContent = (content: any) => content,
  } = options;

  const folderPath = path.dirname(filePath);
  if (!fs.existsSync(folderPath)) {
    await fs.promises.mkdir(folderPath, { recursive: true });
  }

  fs.writeFileSync(filePath, mapToWritableContent(content), dataEncoding);
};

export const readContentFromFile = async (options: {
  filePath: string;
  dataEncoding?: BufferEncoding;
  mapToReadableContent?: (content: string | Buffer) => any;
}): Promise<any> => {
  const {
    filePath,
    dataEncoding = "utf-8",
    mapToReadableContent = (content: any) => content,
  } = options;

  const data = fs.readFileSync(filePath, dataEncoding);
  return mapToReadableContent(data);
};
