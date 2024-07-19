import { Args, Mutation, Query, ResolveField, Resolver, Root } from '@nestjs/graphql';
import { User, UserCreateInput, UserSearchArgs, UserSearchResult } from '../types/user.gql.type';
import { UserService } from './user.service';
import { RentRecord } from '@modules/rentRecords/types/rentRecord.gql.type';
import { RentRecordService } from '@modules/rentRecords/providers/rentRecord.service';

@Resolver(() => User)
export class UserResolver {
    constructor(
        private readonly userService: UserService,
        private readonly rentRecordService: RentRecordService,
    ) { }

    @Query(() => UserSearchResult)
    async users(
        @Args() params: UserSearchArgs,
    ): Promise<UserSearchResult> {
        const result = await this.userService.search({
            ...params.filters,
            ...params,
        });
        return <UserSearchResult>result;
    }

    @Mutation((returns) => User)
    async createUser(
        @Args('input') input: UserCreateInput,
    ): Promise<User> {
        const result = await this.userService.create({
            ...input,
        });
        return result;
    }

    @ResolveField((returns) => [RentRecord])
    async rentRecords(
        @Root() user: User,
    ): Promise<RentRecord[]> {
        const result = await this.rentRecordService.search({
            userId: user.id,
        });
        return result.rows;
    }
}