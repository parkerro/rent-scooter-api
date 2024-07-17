import { ArgsType, Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { IsDate, IsLatitude, IsLongitude, IsNotEmpty } from 'class-validator';
import { CommonSearchArgs, PaginatedSearchResult } from 'src/common/types/common.gql.type';

@ObjectType()
export class RentRecord {
    @Field((type) => ID)
    id: number;

    @Field((type) => ID)
    userId: number;

    @Field((type) => ID)
    scooterId: number;

    @Field()
    startTime: Date;

    @Field({ nullable: true })
    endTime?: Date;

    @Field({ nullable: true })
    startLatitude?: number;

    @Field({ nullable: true })
    startLongitude?: number;

    @Field({ nullable: true })
    endLatitude?: number;

    @Field({ nullable: true })
    endLongitude?: number;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}

@InputType()
class RentRecordSearchInput {
    @Field((type) => ID, { nullable: true })
    id?: number;

    @Field((type) => ID, { nullable: true })
    userId?: number;

    @Field((type) => ID, { nullable: true })
    scooterId?: number;

}

@ArgsType()
export class RentRecordSearchArgs extends CommonSearchArgs(RentRecordSearchInput) { }

@ObjectType()
export class RentRecordSearchResult extends PaginatedSearchResult(RentRecord) { }

@InputType()
export class RentRecordCreateInput {
    @Field((type) => ID)
    @IsNotEmpty()
    userId: number;

    @Field((type) => ID)
    @IsNotEmpty()
    scooterId: number;

    @Field()
    @IsNotEmpty()
    @IsLatitude()
    startLatitude: number;

    @Field()
    @IsNotEmpty()
    @IsLongitude()
    startLongitude: number;
}

@InputType()
export class RentRecordUpdateInput {
    @Field((type) => ID)
    @IsNotEmpty()
    id: number;

    @Field()
    @IsNotEmpty()
    @IsLatitude()
    endLatitude: number;

    @Field()
    @IsNotEmpty()
    @IsLongitude()
    endLongitude: number;
}