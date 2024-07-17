import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentRecord } from './entities/rentRecord.entity';
import { RentRecordService } from './providers/rentRecord.service';
import { RentRecordResolver } from './providers/rentRecord.resolver';
import { UserModule } from '../users/user.module';
import { ScooterModule } from '../scooters/scooter.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([RentRecord]),
        forwardRef(() => UserModule),
        forwardRef(() => ScooterModule),
    ],
    providers: [RentRecordService, RentRecordResolver],
    exports: [RentRecordService],
})
export class RentRecordModule { }
