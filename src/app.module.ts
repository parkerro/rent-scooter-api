import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';
import config from './config/config';
import { UserModule } from './modules/users/user.module';
import { ScooterModule } from './modules/scooters/scooter.module';
import { RentRecordModule } from './modules/rentRecords/rentRecord.module';
import { User } from './modules/users/entities/user.entity';
import { Scooter } from './modules/scooters/entities/scooter.entity';
import { RentRecord } from './modules/rentRecords/entities/rentRecord.entity';

@Module({
    imports: [
        // Config
        ConfigModule.forRoot({ isGlobal: true, load: [config] }),

        // Database
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                ...configService.get('config.database'),
                entities: [User, Scooter, RentRecord],
            }),
            inject: [ConfigService],
        }),

        // GraphQL
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            playground: false,
            plugins: [
                ApolloServerPluginLandingPageLocalDefault(),
            ],
        }),

        // Modules
        UserModule,
        ScooterModule,
        RentRecordModule,
    ],
})
export class AppModule { }
