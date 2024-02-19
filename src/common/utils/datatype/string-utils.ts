export const capFirstLetter = (word = '') => {
  return `${word[0].toUpperCase()}${word.slice(1)}`;
};

export const deCapFirstLetter = (word = '') => {
  return `${word[0].toLowerCase()}${word.slice(1)}`;
};

const toCamelCase = ({
  sentense = '',
  initWordSeperator = ' ',
  finalWordSeperator = '',
}) => {
  return sentense
    .split(initWordSeperator)
    .map((word, index) => {
      if (index === 0) return deCapFirstLetter(word);
      return capFirstLetter(word);
    })
    .join(finalWordSeperator);
};

const toPascalCase = ({
  sentense = '',
  initWordSeperator = ' ',
  finalWordSeperator = '',
}) => {
  return sentense
    .split(initWordSeperator)
    .map((word) => capFirstLetter(word))
    .join(finalWordSeperator);
};

export const isSpecialChar = (value: string) => {
  const pattern = new RegExp(/[^((0-9)|(a-z)|(A-Z)|\s)]/);
  return pattern.test(value);
};

export const isUpperCase = (letter: string) => {
  if (isSpecialChar(letter)) return false;
  if (typeof letter !== 'string') return undefined;
  const cappedLetter = letter.toUpperCase();
  if (letter === cappedLetter) return true;
  return false;
};

export const isLowerCase = (letter: string) => {
  if (isSpecialChar(letter)) return false;
  if (typeof letter !== 'string') return undefined;
  const decappedLetter = letter.toLowerCase();
  if (letter === decappedLetter) return true;
  return false;
};

export const toTitleCase = (sentense: string) => {
  return toPascalCase({ sentense, finalWordSeperator: ' ' });
};

export const textToCamelCase = (sentense: string) => {
  return toCamelCase({ sentense });
};

export const textToPascalCase = (sentense: string) => {
  return toPascalCase({ sentense });
};

export const hypenToCamelCase = (sentense: string) => {
  return toCamelCase({ sentense, initWordSeperator: '-' });
};

export const hypenToPascalCase = (sentense: string) => {
  return toPascalCase({ sentense, initWordSeperator: '-' });
};
