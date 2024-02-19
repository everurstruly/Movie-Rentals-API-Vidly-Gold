const isAbsIndex = (index: number) => index >= 0;

export const isEmptyArray = (arr: any) => {
  return arr && Array.isArray(arr) && arr.length < 1;
};

export const getItemsWrappedInArray = (items: any) => {
  if (Array.isArray(items)) return items;
  if (items) return [items];
  return undefined;
};

export const removeItemFromArray = <T>(
  itemToBeRemoved: T,
  arr: any[],
  removeItemWhereTrue: () => number
) => {
  let itemToBeRemovedIndex = arr.indexOf(itemToBeRemoved);
  if (removeItemWhereTrue) {
    itemToBeRemovedIndex = arr.findIndex(removeItemWhereTrue);
  }

  if (!isAbsIndex(itemToBeRemovedIndex)) return undefined;
  return arr.splice(itemToBeRemovedIndex, 1)[0];
};
