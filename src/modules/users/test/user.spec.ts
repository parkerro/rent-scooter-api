import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from '@modules/users/providers/user.service';
import { UserResolver } from '@modules/users/providers/user.resolver';
import { User } from '@modules/users/entities/user.entity';

describe('UserResolver', () => {
    let userResolver: UserResolver;
    let userService: UserService;

    const mockUserRepository = {
        find: jest.fn(),
        findOne: jest.fn(),
        create: jest.fn(),
        save: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserResolver,
                UserService,
                {
                    provide: getRepositoryToken(User),
                    useValue: mockUserRepository,
                },
            ],
        }).compile();

        userResolver = module.get<UserResolver>(UserResolver);
        userService = module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(userResolver).toBeDefined();
    });

    describe('users', () => {
        it('should return an array of users', async () => {
            const result = {
                rows: [{
                    id: 1,
                    username: 'test',
                    email: 'new@example.com',
                    password: 'password',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    rentRecords: [],
                }],
                count: 1,
                pageInfo: {
                    hasNextPage: false,
                    hasPreviousPage: false
                }
            };
            jest.spyOn(userService, 'search').mockResolvedValue(result);

            expect(await userResolver.users({ filters: {} })).toBe(result);
        });
    });

    describe('createUser', () => {
        it('should create a new user', async () => {
            const createUserInput = { username: 'newuser', email: 'new@example.com', password: 'password' };
            const newUser = {
                id: 1,
                ...createUserInput,
                createdAt: new Date(),
                updatedAt: new Date(),
                rentRecords: [],
            };
            jest.spyOn(userService, 'create').mockResolvedValue(newUser);

            expect(await userResolver.createUser(createUserInput)).toBe(newUser);
        });
    });
});