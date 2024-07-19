import { ArgsType, Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { IsEnum, IsLatitude, IsLongitude, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Max, Min } from 'class-validator';
import { CommonSearchArgs, PaginatedSearchResult } from '@common/types/common.gql.type';
import { ScooterStatus } from './scooter.gql.enum';

@ObjectType()
export class Scooter {
    @Field((type) => ID)
    id: number;

    @Field()
    model: string;

    @Field((type) => ScooterStatus)
    status: ScooterStatus;

    @Field()
    latitude: number;

    @Field()
    longitude: number;

    @Field()
    batteryLevel: number;

    @Field()
    serialNumber: string;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}

@InputType()
class ScooterSearchInput {
    @Field((type) => ID, { nullable: true })
    id?: number;

    @Field({ nullable: true })
    serialNumber?: string;

    @Field((type) => [ScooterStatus], { nullable: true })
    statuses: ScooterStatus[];

}

@ArgsType()
export class ScooterSearchArgs extends CommonSearchArgs(ScooterSearchInput) { }

@ObjectType()
export class ScooterSearchResult extends PaginatedSearchResult(Scooter) { }

@InputType()
export class ScooterCreateInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    @Length(1, 50)
    model: string;

    @Field((type) => ScooterStatus, { defaultValue: ScooterStatus.AVAILABLE })
    @IsNotEmpty()
    @IsEnum(ScooterStatus)
    status: ScooterStatus;

    @Field()
    @IsNotEmpty()
    @IsLatitude()
    latitude: number;

    @Field()
    @IsNotEmpty()
    @IsLongitude()
    longitude: number;

    @Field()
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @Max(100)
    batteryLevel: number;

    @Field()
    @IsNotEmpty()
    @IsString()
    @Length(1, 50)
    serialNumber: string;
}

@InputType()
export class ScooterUpdateInput {
    @Field((type) => ID)
    @IsNotEmpty()
    id: number;

    @Field((type) => ScooterStatus, { nullable: true })
    @IsOptional()
    @IsEnum(ScooterStatus)
    status?: ScooterStatus;

    @Field({ nullable: true })
    @IsOptional()
    @IsLatitude()
    latitude?: number;

    @Field({ nullable: true })
    @IsOptional()
    @IsLongitude()
    longitude?: number;

    @Field({ nullable: true })
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(100)
    batteryLevel?: number;
}