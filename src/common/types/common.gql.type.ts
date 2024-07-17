import { ArgsType, Field, Int, ObjectType } from "@nestjs/graphql";
import { ClassType } from "./common.interface";

@ArgsType()
export class PageArgs {
    @Field((type) => Int, { nullable: true, defaultValue: 0 })
    offset?: number;

    @Field((type) => Int, { nullable: true, defaultValue: 50 })
    limit?: number;
}

export const CommonSearchArgs = <T>(filters: ClassType<T>) => {
    @ArgsType()
    class CommonSearchArgsClass extends PageArgs {
        @Field((type) => filters)
        filters: T;
    }
    return CommonSearchArgsClass;
};

@ObjectType()
export class PageInfo {
    @Field((type) => Boolean)
    hasNextPage: boolean;

    @Field((type) => Boolean)
    hasPreviousPage: boolean;
}

export const PaginatedSearchResult = <T>(
    items: ClassType<T> | string | number | boolean,
) => {
    @ObjectType({ isAbstract: true })
    abstract class PaginatedSearchResultClass {
        @Field((type) => [items])
        rows: T[];

        @Field((type) => Int)
        count: number;

        @Field((type) => PageInfo)
        pageInfo: PageInfo;
    }
    return PaginatedSearchResultClass;
};