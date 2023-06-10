export const purgeArray = <T>(arr: (T | false | undefined)[]): T[] => {
  return (arr.filter((item) => !!item) as unknown) as T[];
};
