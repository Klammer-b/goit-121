export const buildPaginationOptions = (page, perPage, recordsCount) => {
  const totalPages = Math.ceil(recordsCount / perPage);
  const hasPreviousPage = page > 1;
  const hasNextPage = page < totalPages;

  return {
    page,
    perPage,
    totalPages,
    totalRecords: recordsCount,
    hasPreviousPage,
    hasNextPage,
  };
};
