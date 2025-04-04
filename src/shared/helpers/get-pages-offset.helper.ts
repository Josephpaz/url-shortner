export const getPageOffsets = (page: number, pageSize: number) => {
  const skip = (page - 1) * pageSize;
  const take = pageSize;

  return { skip, take };
};
