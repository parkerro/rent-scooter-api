import {
    Injectable,
    ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, FindOptionsWhere, ILike, In, IsNull, Repository } from 'typeorm';
import { RentRecord } from '../entities/rentRecord.entity';
import { CommonSearchResult } from 'src/common/types/common.type';
import { CreateParams, SearchParams, UpdateParams } from '../types/rentRecord.type';
import { PageInfoHelper } from 'src/common/helpers/pageInfo.helper';
import { CommonService } from 'src/common/providers/common.service';
import { ScooterService } from 'src/modules/scooters/providers/scooter.service';
import { ScooterStatus } from 'src/modules/scooters/types/scooter.enum';
import { Scooter } from 'src/modules/scooters/entities/scooter.entity';
import * as moment from 'moment';

@Injectable()
export class RentRecordService extends CommonService<RentRecord> {
    constructor(
        @InjectRepository(RentRecord)
        private rentRecordsRepo: Repository<RentRecord>,
        private readonly scooterService: ScooterService,
        private dataSource: DataSource,
    ) {
        super()
    }

    async search(params: SearchParams): Promise<CommonSearchResult<RentRecord>> {
        const filters: FindOptionsWhere<RentRecord> = {};
        if (params.id) {
            filters.id = params.id;
        }
        if (params.ids) {
            filters.id = In(params.ids);
        }
        if (params.userId) {
            filters.userId = params.userId;
        }
        if (params.scooterId) {
            filters.scooterId = params.scooterId;
        }

        const [rows, count] = await this.rentRecordsRepo.findAndCount({
            where: filters,
            skip: params.offset,
            take: params.limit,
            order: {
                createdAt: 'desc',
                id: 'asc',
            },
        });

        return {
            pageInfo: PageInfoHelper.generate({
                searchParams: params,
                totalCount: count,
            }),
            rows: rows,
            count: count,
        };
    }

    async create(params: CreateParams): Promise<RentRecord> {
        // 檢查用戶是否有活躍的租借
        const activeRental = await this.rentRecordsRepo.findOne({
            where: { userId: params.userId, endTime: IsNull() }
        });
        if (activeRental) {
            throw new ConflictException('User already has an active rental');
        }

        // 檢查電動車是否可用
        const scooter = await this.scooterService.findOneOrError(params.scooterId);
        if (scooter.status !== ScooterStatus.AVAILABLE) {
            throw new ConflictException('Scooter is not available for rent');
        }

        // Start tx
        const savedRentRecord = await this.dataSource.transaction(async (manager) => {
            // 創建租借記錄
            const rentRecord = this.rentRecordsRepo.create({
                ...params,
                startTime: moment(),
            });
            const savedRentRecord = await manager.save(rentRecord);

            // 更新電動車狀態
            await manager.update(Scooter, params.scooterId, { status: ScooterStatus.IN_USE });
            return savedRentRecord;
        });

        return await this.findOneOrError(savedRentRecord.id)
    }

    async update(params: UpdateParams): Promise<RentRecord> {
        const rentRecord = await this.findOneOrError(params.id);

        // 如果已結束租借，不更新任何資料
        if (rentRecord.endTime) {
            throw new ConflictException('Rent record is not available to update');
        }

        const rentRecordToUpdate = this.rentRecordsRepo.create({
            ...rentRecord,
            ...params,
            id: rentRecord.id,
        });

        // Start tx
        await this.dataSource.transaction(async (manager) => {
            // 如果是結束租借
            if (params.endLatitude && params.endLongitude) {
                // 設置 endTime
                rentRecordToUpdate.endTime = moment().toDate();

                // 更新電動車狀態為可用
                await this.scooterService.update({
                    id: rentRecord.scooterId,
                    status: ScooterStatus.AVAILABLE,
                });
            }

            await manager.save(rentRecordToUpdate);
        });

        return await this.findOneOrError(rentRecord.id)
    }
}
