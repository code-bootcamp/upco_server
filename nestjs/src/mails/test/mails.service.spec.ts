import { MailerModule } from "@nest-modules/mailer";
import { CacheModule } from "@nestjs/common";
import { ObjectType } from "@nestjs/graphql";
import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { MailerService } from "nest-mailer";
import { User } from "src/users/entities/user.entity";
import {
  IUsersServiceFindOneById,
  IUsersServiceUpdate,
} from "src/users/interfaces/user-service.interface";
import { UsersService } from "src/users/users.service";
import { MailService } from "../mails.service";

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

class MockUserService {}
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

describe("mailService", () => {
  let mailService: MailService;
  let mailerService: MailerService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        MailerModule.forRootAsync({
          useFactory: () => ({
            transport: {
              service: process.env.MAIL_SERVICE,
              auth: {
                user: process.env.MAIL_AUTH_USER,
                pass: process.env.MAIL_AUTH_PASSWORD,
              },
            },
          }),
        }),
        CacheModule.register({}),
      ],
      providers: [
        UsersService,
        MailService,
        {
          provide: getRepositoryToken(User),
          useClass: MockUserRepository,
        },
        {
          provide: MailerService,
          useValue: {
            sendMail: jest.fn(),
          },
        },
      ],
    }).compile();

    mailService = module.get<MailService>(MailService);
    mailerService = module.get<MailerService>(MailerService);
    usersService = module.get<UsersService>(UsersService);
  });

  // findOneByEmail / email 없을 경우 에러
  // passwordResetMailer
  // renderNewPassword
  describe("renderNewPassword", () => {
    it("renderNewPassword 함수 실행 시 랜덤한 6자리 숫자 출력해야 함", () => {
      const result = mailService.renderNewPassword();
      expect(result).toHaveLength(6);
    });
  });
});
