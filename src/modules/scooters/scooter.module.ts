import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Scooter } from './entities/scooter.entity';
import { ScooterService } from './providers/scooter.service';
import { ScooterResolver } from './providers/scooter.resolver';
import { RentRecordModule } from '../rentRecords/rentRecord.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Scooter]),
        forwardRef(() => RentRecordModule),
    ],
    providers: [ScooterService, ScooterResolver],
    exports: [ScooterService],
})
export class ScooterModule { }
