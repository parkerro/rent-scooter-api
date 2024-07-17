import { NotFoundException } from '@nestjs/common';
import {
    CommonFindAndCountResult,
    CommonSearchParams,
    CommonSearchResult,
} from '../types/common.type';
import * as DataLoader from 'dataloader';
import { groupBy } from 'lodash';

export abstract class CommonService<T> {
    get commonDataNotFoundMessage(): string {
        return 'Data not found';
    }

    protected toFindAndCountResult(
        obj: [T[], number],
    ): CommonFindAndCountResult<T> {
        return { rows: obj[0], count: obj[1] };
    }

    private dataloader = new DataLoader(
        async (ids: readonly number[]) => {
            const result = await this.search({
                ids: ids as number[],
            });
            // 提醒須要實作 search ids
            if (result.rows.length > ids.length) {
                console.error(`${this.constructor.name} 需要實作 search ids`);
            }
            const grouped = groupBy(result.rows, 'id');
            return ids.map((key) => grouped[key]?.[0] || null);
        },
        {
            cache: false,
            batchScheduleFn: (callback) => setTimeout(callback, 100),
        },
    );

    async findOne(id: number | null): Promise<T | null> {
        if (id === null || id === undefined) {
            return null;
        }
        const res = await this.dataloader.load(id);
        return res;
    }

    async findByIds(ids: number[]): Promise<T[]> {
        if (ids.length == 0) {
            return [];
        }
        const res = <T[]>await this.dataloader.loadMany(ids);
        return res.filter((el) => el);
    }

    async findOneOrError(id: number, dataNotFoundMessage?: string): Promise<T> {
        const data = await this.findOne(id);
        if (!data) {
            const message =
                dataNotFoundMessage || this.commonDataNotFoundMessage || '';
            throw new NotFoundException(message);
        }
        return data;
    }

    async findAll(): Promise<T[]> {
        const data = await this.search({});
        return data.rows;
    }

    abstract search(params: CommonSearchParams): Promise<CommonSearchResult<T>>;
}
