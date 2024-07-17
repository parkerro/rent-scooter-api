import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './providers/user.service';
import { User } from './entities/user.entity';
import { UserResolver } from './providers/user.resolver';
import { RentRecordModule } from '../rentRecords/rentRecord.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        forwardRef(() => RentRecordModule),
    ],
    providers: [UserService, UserResolver],
    exports: [UserService]
})
export class UserModule { }
