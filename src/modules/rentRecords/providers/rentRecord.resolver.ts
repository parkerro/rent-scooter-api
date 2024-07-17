import { Args, Mutation, Query, Resolver, ResolveField, Root } from '@nestjs/graphql';
import { RentRecord, RentRecordCreateInput, RentRecordSearchArgs, RentRecordSearchResult, RentRecordUpdateInput } from '../types/rentRecord.gql.type';
import { RentRecordService } from './rentRecord.service';
import { User } from 'src/modules/users/types/user.gql.type';
import { UserService } from 'src/modules/users/providers/user.service';
import { ScooterService } from 'src/modules/scooters/providers/scooter.service';
import { Scooter } from 'src/modules/scooters/types/scooter.gql.type';

@Resolver(() => RentRecord)
export class RentRecordResolver {
    constructor(
        private readonly rentRecordService: RentRecordService,
        private readonly userService: UserService,
        private readonly scooterService: ScooterService,
    ) { }

    @Query(() => RentRecordSearchResult)
    async rentRecords(
        @Args() params: RentRecordSearchArgs,
    ): Promise<RentRecordSearchResult> {
        const result = await this.rentRecordService.search({
            ...params.filters,
            ...params,
        });
        return <RentRecordSearchResult>result;
    }

    @Mutation((returns) => RentRecord)
    async createRentRecord(
        @Args('input') input: RentRecordCreateInput,
    ): Promise<RentRecord> {
        const result = await this.rentRecordService.create({
            ...input,
        });
        return result;
    }

    @Mutation((returns) => RentRecord)
    async updateRentRecord(
        @Args('input') input: RentRecordUpdateInput,
    ): Promise<RentRecord> {
        const result = await this.rentRecordService.update({
            ...input,
        });
        return result;
    }

    @ResolveField((returns) => User, { nullable: true })
    async user(
        @Root() rentRecord: RentRecord,
    ): Promise<User | null> {
        const result = await this.userService.findOne(
            rentRecord.userId,
        );
        return result;
    }

    @ResolveField((returns) => Scooter, { nullable: true })
    async scooter(
        @Root() rentRecord: RentRecord,
    ): Promise<Scooter | null> {
        const result = await this.scooterService.findOne(
            rentRecord.scooterId,
        );
        return result;
    }
}