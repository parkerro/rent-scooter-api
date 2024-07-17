
export type CommonSearchParams = CommonIdParams & CommonLimitParams;

export type CommonIdParams = {
    id?: number;
    ids?: number[];
};

export type CommonLimitParams = {
    limit?: number;
    offset?: number;
};

export type CommonPageInfo = {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
};

export type CommonFindAndCountResult<T> = {
    rows: T[];
    count: number;
};

export type CommonSearchResult<T> = {
    rows: T[];
    count: number;
    pageInfo: CommonPageInfo;
};