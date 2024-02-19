import config from 'config';

const getDetailedNestedObjectPaths = (path: string | (string | number)[]) => {
  let rootPath;
  let otherPaths;
  if (Array.isArray(path)) {
    const reformedPath = path.join('.').split('.');
    rootPath = reformedPath[0];
    otherPaths = reformedPath.slice(1);
  } else {
    [rootPath, ...otherPaths] = path.split('.');
  }

  return {
    paths: [rootPath, ...otherPaths],
    rootPath,
    otherPaths,
  };
};

export const objectKeys = <Obj extends object>(
  inObject: Obj
): Array<keyof Obj> => {
  return Object.keys(inObject) as Array<keyof Obj>;
};

export const isObjectLiteral = (value: any): boolean => {
  return value && typeof value === 'object' && !Array.isArray(value);
};

export const isEmptyObject = (value: object): boolean => {
  return isObjectLiteral(value) && Object.keys(value).length < 1;
};

export const cloneDeep = (cloneFrom: object, depth?: number) => {
  return config.util.cloneDeep(cloneFrom, depth);
};

export const getValueByPaths = (
  inObject: Record<string | number, any>,
  path: string | (string | number)[]
): any => {
  const { rootPath, otherPaths } = getDetailedNestedObjectPaths(path);
  const supposedValue = inObject[rootPath];
  const isAtDeepestPath = otherPaths.length > 0;
  if (supposedValue === undefined) return undefined;
  if (isAtDeepestPath) return getValueByPaths(supposedValue, otherPaths);
  return supposedValue;
};

export const setValueByPaths = (
  inObject: Record<string | number, any>,
  path: string | (string | number)[],
  value: any,
  shouldMutateObj = true
): object => {
  const { rootPath, otherPaths } = getDetailedNestedObjectPaths(path);
  const inObjectCloned = shouldMutateObj ? inObject : cloneDeep(inObject);
  const isAtDeepestPath = otherPaths.length === 0;
  if (isAtDeepestPath) {
    inObjectCloned[rootPath] = value;
    return inObjectCloned;
  }

  if (inObjectCloned[rootPath] === undefined) {
    inObjectCloned[rootPath] = {};
  }

  return setValueByPaths(inObjectCloned[rootPath], otherPaths, value, true);
};

export const pickProperties = (
  inObject: Record<string | number, any>,
  keys: any[]
) => {
  return keys.reduce((picked, key) => {
    picked[key] = inObject[key];
    return picked;
  }, {});
};

export const updateOneByOther = <One extends object, Other extends object>(
  objToUpdate: One,
  objWithUpdates: Other,
  shouldMutateObj = true
) => {
  const oneObj = shouldMutateObj ? objToUpdate : cloneDeep(objToUpdate);
  const otherObj = shouldMutateObj ? objWithUpdates : cloneDeep(objWithUpdates);
  for (const key in oneObj) {
    const valueToUpdate = oneObj[key];
    const valueWithUpdate = otherObj[key];
    if (!isObjectLiteral(valueToUpdate)) otherObj[key] = valueWithUpdate;
    else updateOneByOther(valueToUpdate, valueWithUpdate, true);
  }

  return oneObj as One;
};
