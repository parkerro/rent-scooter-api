import { ArgsType, Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { CommonSearchArgs, PaginatedSearchResult } from 'src/common/types/common.gql.type';

@ObjectType()
export class User {
    @Field((type) => ID)
    id: number;

    @Field()
    username: string;

    @Field()
    email: string;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}

@InputType()
class UserSearchInput {
    @Field((type) => ID, { nullable: true })
    id?: number;

    @Field({ nullable: true })
    email?: string;

}

@ArgsType()
export class UserSearchArgs extends CommonSearchArgs(UserSearchInput) { }

@ObjectType()
export class UserSearchResult extends PaginatedSearchResult(User) { }

@InputType()
export class UserCreateInput {
    @Field()
    @IsString()
    username: string;

    @Field()
    @IsEmail()
    email: string;

    @Field()
    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 chars' })
    password: string;
}