export const getRandomInt = (min: number, max: number) => {
  //The maximum is exclusive and the minimum is inclusive
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
};
