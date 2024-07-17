import { Args, Mutation, Query, ResolveField, Resolver, Root } from '@nestjs/graphql';
import { Scooter, ScooterCreateInput, ScooterSearchArgs, ScooterSearchResult, ScooterUpdateInput } from '../types/scooter.gql.type';
import { ScooterService } from './scooter.service';
import { RentRecordService } from 'src/modules/rentRecords/providers/rentRecord.service';
import { RentRecord } from 'src/modules/rentRecords/types/rentRecord.gql.type';

@Resolver(() => Scooter)
export class ScooterResolver {
    constructor(
        private readonly scooterService: ScooterService,
        private readonly rentRecordService: RentRecordService,
    ) { }

    @Query(() => ScooterSearchResult)
    async scooters(
        @Args() params: ScooterSearchArgs,
    ): Promise<ScooterSearchResult> {
        const result = await this.scooterService.search({
            ...params.filters,
            ...params,
        });
        return <ScooterSearchResult>result;
    }

    @Mutation((returns) => Scooter)
    async createScooter(
        @Args('input') input: ScooterCreateInput,
    ): Promise<Scooter> {
        const result = await this.scooterService.create({
            ...input,
        });
        return result;
    }

    @Mutation((returns) => Scooter)
    async updateScooter(
        @Args('input') input: ScooterUpdateInput,
    ): Promise<Scooter> {
        const result = await this.scooterService.update({
            ...input,
        });
        return result;
    }

    @ResolveField((returns) => [RentRecord])
    async rentRecords(
        @Root() scooter: Scooter,
    ): Promise<RentRecord[]> {
        const result = await this.rentRecordService.search({
            scooterId: scooter.id,
        });
        return result.rows;
    }
}