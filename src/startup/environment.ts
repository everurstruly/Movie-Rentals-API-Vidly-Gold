import * as path from 'path';

const SRC_DIR = path.join(__dirname, '..');
const ROOT_DIR = path.join(SRC_DIR, '..');
const SRC_COMMON__DIR = path.join(SRC_DIR, 'common');

const getMainConfigSubDir = (parentDir: string) => {
  return path.join(parentDir, 'config');
};

export const setPreEnvironment = () => {
  const NODE_CONFIG_DIR_VALUE = `${getMainConfigSubDir(
    SRC_COMMON__DIR
  )};${getMainConfigSubDir(SRC_DIR)};${getMainConfigSubDir(ROOT_DIR)}`;

  process.env['NODE_CONFIG_DIR'] = NODE_CONFIG_DIR_VALUE;
};
