import {
    Injectable,
    ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, In, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CommonSearchResult } from '@common/types/common.type';
import { CreateParams, SearchParams } from '../types/user.type';
import { PageInfoHelper } from '@common/helpers/pageInfo.helper';
import { CommonService } from '@common/providers/common.service';

@Injectable()
export class UserService extends CommonService<User> {
    constructor(
        @InjectRepository(User)
        private usersRepo: Repository<User>,
    ) {
        super()
    }

    async search(params: SearchParams): Promise<CommonSearchResult<User>> {
        const filters: FindOptionsWhere<User> = {};
        if (params.id) {
            filters.id = params.id;
        }
        if (params.ids) {
            filters.id = In(params.ids);
        }
        if (params.email) {
            filters.email = ILike(`%${params.email}%`);
        }

        const [rows, count] = await this.usersRepo.findAndCount({
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

    async create(params: CreateParams): Promise<User> {
        const existingUser = await this.usersRepo.findOne({
            where: { email: params.email },
        });
        if (existingUser) {
            throw new ConflictException('Email already exists');
        }

        const hashedPassword = await bcrypt.hash(params.password, 10);
        const user = this.usersRepo.create({
            ...params,
            password: hashedPassword,
        });

        return this.usersRepo.save(user);
    }
}
