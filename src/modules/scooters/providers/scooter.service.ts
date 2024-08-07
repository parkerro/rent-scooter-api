import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, In, Repository } from 'typeorm';
import { Scooter } from '../entities/scooter.entity';
import { CommonSearchResult } from '@common/types/common.type';
import { CreateParams, SearchParams, UpdateParams } from '../types/scooter.type';
import { PageInfoHelper } from '@common/helpers/pageInfo.helper';
import { CommonService } from '@common/providers/common.service';

@Injectable()
export class ScooterService extends CommonService<Scooter> {
    constructor(
        @InjectRepository(Scooter)
        private scootersRepo: Repository<Scooter>,
    ) {
        super();
    }

    async search(params: SearchParams): Promise<CommonSearchResult<Scooter>> {
        const filters: FindOptionsWhere<Scooter> = this.buildSearchFilters(params);

        const [rows, count] = await this.scootersRepo.findAndCount({
            where: filters,
            relations: {
                rentRecords: true,
            },
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

    private buildSearchFilters(params: SearchParams): FindOptionsWhere<Scooter> {
        const filters: FindOptionsWhere<Scooter> = {};
        if (params.id) {
            filters.id = params.id;
        }
        if (params.ids) {
            filters.id = In(params.ids);
        }
        if (params.serialNumber) {
            filters.serialNumber = params.serialNumber;
        }
        if (params.statuses) {
            filters.status = In(params.statuses);
        }
        return filters;
    }

    async create(params: CreateParams): Promise<Scooter> {
        const existingScooter = await this.scootersRepo.findOne({
            where: { serialNumber: params.serialNumber },
        });
        if (existingScooter) {
            throw new ConflictException('serial number already exists');
        }

        const scooter = this.scootersRepo.create(params);
        return this.scootersRepo.save(scooter);
    }

    async update(params: UpdateParams): Promise<Scooter> {
        const scooterToUpdate = await this.findOneOrError(params.id);
        const scooter = await this.scootersRepo.save({
            ...scooterToUpdate,
            ...params,
            id: scooterToUpdate.id,
        });
        return scooter;
    }
}
