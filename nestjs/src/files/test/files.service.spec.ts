import { ObjectType } from "@nestjs/graphql";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import {
  IUsersServiceFindOneById,
  IUsersServiceUpdate,
} from "src/users/interfaces/user-service.interface";
import { UsersService } from "src/users/users.service";
import { FilesService } from "../files.service";

ObjectType();
class MockUser {
  id: string;
  nickname: string;
  email: string;
  password: string;
  provider: string;
  age: number;
  interest: string;
  reported: number;
  image: null | string;
  createAt: Date;
  updateAt: Date;
  deleteAt: Date;
}

class MockUserRepository {
  database = [
    {
      id: "user1",
      nickname: "nickname1",
      email: "email@email.com1",
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
}

class MockBucket {
  bucket = [];

  upload({ id, file }): string {
    const url = id + "." + file;
    this.bucket.push(url);
    return url;
  }
}

describe("fileService", () => {
  let filesService: FilesService;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilesService,
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: MockUserRepository,
        },
      ],
    }).compile();

    filesService = module.get<FilesService>(FilesService);
    userService = module.get<UsersService>(UsersService);
  });

  describe("uploadFile", () => {
    it("파일 업로드 시 url 을 반환해야 함", async () => {
      const id = "user1";
      const file = "png";
      const mockBucket = new MockBucket();

      const result = await mockBucket.upload({ id, file });
      expect(result).toBe("user1.png");
    });

    it("유저의 image가 정상적으로 업데이트되어야 함", () => {
      const mockUserRepository = new MockUserRepository();
      const id = "user1";
      const url = "user1.png";
      const updateUserInput = {
        image: url,
      };

      const result = mockUserRepository.update({ id, updateUserInput });
      expect(result).toEqual({
        id: "user1",
        nickname: "nickname1",
        email: "email@email.com1",
        password: "password",
        provider: "credentials",
        age: 30,
        interest: "null",
        reported: 0,
        image: url,
        createAt: expect.any(Date),
        updateAt: expect.any(Date),
        deleteAt: expect.any(Date),
      });
    });
  });
});
