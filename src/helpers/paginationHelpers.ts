
type IOptions = {
  page?: number;
  limit?: number;
 
};

type IOptionsResult = IOptions & {
  page: number;
  limit: number;
  skip: number;
};

const calculatorPagination = (options: IOptions): IOptionsResult => {
  const page = Number(options.page || 1);
  const limit = Number(options.limit || 10);
  const skip = (page - 1) * limit;

  return {
    page,
    limit,
    skip,
  };
};

export const paginationHelpers = { calculatorPagination };
