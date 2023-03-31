import { CacheModule, NotAcceptableException } from "@nestjs/common";
import { ObjectType } from "@nestjs/graphql";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import {
  IUsersServiceCreate,
  IUsersServiceDelete,
  IUsersServiceFindOneById,
  IUsersServiceUpdate,
} from "../interfaces/user-service.interface";
import { UsersService } from "../users.service";

@ObjectType()
class MockUser {
  id?: string;
  nickname?: string;
  email?: string;
  password?: string;
  provider?: string;
  age?: number;
  interest?: string;
  reported?: number;
  image?: null | string;
  createAt?: Date;
  updateAt?: Date;
  deleteAt?: Date;
}

class MockUserRepository {
  database = [
    {
      id: "user1",
      nickname: "nickname1",
      email: "test@email.com",
      password: "password",
      provider: "credentials",
      age: 30,
      interest: "null",
      reported: 0,
      image: null,
      createAt: new Date(),
      updateAt: new Date(),
      deleteAt: new Date(),
    },
  ];

  findOne({ id }: IUsersServiceFindOneById): MockUser {
    return this.database.find((user) => user.id === id);
  }

  update({ id, updateUserInput }: IUsersServiceUpdate): MockUser {
    const user = this.findOne({ id });

    const result = { ...user, ...updateUserInput };
    return result;
  }

  save({ createUserInput }: IUsersServiceCreate): MockUser {
    const newUser = new MockUser();
    const { nickname, email, password } = createUserInput;
    newUser.nickname = nickname;
    newUser.email = email;
    newUser.password = password;

    this.database.push();

    return newUser;
  }

  softDelete({ id }: IUsersServiceDelete): boolean {
    const user = this.findOne({ id });
    return user ? true : false;
  }
}

describe("usersService", () => {
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CacheModule.register({}), //
      ],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: MockUserRepository,
        },
        {
          provide: UsersService,
          useValue: {
            findOneByEmail: jest.fn(),
            findOneById: jest.fn(),
            create: jest.fn(),
            createOauthUser: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("createUser", () => {
    it("createUser 실행 시 정상적으로 유저 생성 및 저장되어야 함", () => {
      const mockUserRepository = new MockUserRepository();
      const createUserInput = {
        nickname: "testName",
        email: "test@gmail.com",
        password: "12345",
      };

      const result = mockUserRepository.save({
        createUserInput,
      });

      expect(result).toEqual({
        nickname: "testName",
        email: "test@gmail.com",
        password: "12345",
      });
    });
  });

  describe("fetchUser", () => {
    it("fetchUser 실행 시 개별 회원의 id가 조회되어야 함", () => {
      const mockUserRepository = new MockUserRepository();
      const id = "user1";
      const result = mockUserRepository.findOne({ id });

      expect(result.id).toEqual("user1");
    });
  });

  describe("deleteUser", () => {
    it("deleteUser 실행 시 해당 회원의 id 데이터가 삭제되어야 함", () => {
      const mockUserRepository = new MockUserRepository();
      const id = "user1";
      const result = mockUserRepository.softDelete({ id });
      expect(result).toBe(true);
    });
  });

  describe("updateUser", () => {
    it("updateUser 실행 시 정상적으로 유저 정보가 수정이 되어야 함", () => {
      const mockUserRepository = new MockUserRepository();
      const user = {
        id: "user2",
      };
      const updateUserInput = {
        nickname: "testName2",
        email: "test2@gmail.com",
        password: "12345",
      };

      const result = mockUserRepository.update({
        ...user,
        updateUserInput,
      });
      expect(result).toEqual({
        ...user,
        updateUserInput,
      });
    });
  });
});
