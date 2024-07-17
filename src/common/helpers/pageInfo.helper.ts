import { CommonPageInfo, CommonSearchParams } from "src/common/types/common.type";

export namespace PageInfoHelper {
    export const generate = (params: {
        searchParams: CommonSearchParams;
        totalCount: number;
    }): CommonPageInfo => {
        const { totalCount } = params;
        const { limit, offset } = params.searchParams;

        const hasNextPage =
            totalCount > 1 && (limit || 0) + (offset || 0) < totalCount;
        const hasPreviousPage = (offset || 0) > 1;

        return { hasNextPage, hasPreviousPage };
    };
}
