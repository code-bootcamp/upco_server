import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";

import * as bcrypt from "bcrypt";
import {
  IUsersServiceCreate,
  IUsersServiceFindOneByEmail,
  IUsersServiceFindOneByHash,
} from "./interfaces/user-service.interface";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findOneByEmail({ email }: IUsersServiceFindOneByEmail): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }

  findOneByHash({ password }: IUsersServiceFindOneByHash): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async create({ createUserInput }: IUsersServiceCreate): Promise<User> {
    const { nickname, email, password } = createUserInput;
    const user = await this.findOneByEmail({ email });
    if (user) throw new ConflictException("이미 등록된 이메일입니다!");
    const hashedPassword = await this.findOneByHash({ password });
    return this.usersRepository.save({
      email,
      password: hashedPassword,
      nickname,
    });
  }

  findLogin({ context }) {
    const user = this.usersRepository.findOne({
      where: { userId: context.req.user.userId },
    });

    return user;
  }
}
