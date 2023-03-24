import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";

import * as bcrypt from "bcrypt";
import {
  IUserServiceCreateOauthUser,
  IUsersServiceCreate,
  IUsersServiceDelete,
  IUsersServiceFindLogin,
  IUsersServiceFindOneByEmail,
  IUsersServiceFindOneByHash,
  IUsersServiceFindOneById,
  IUsersServiceUpdate,
} from "./interfaces/user-service.interface";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findOneById({ id }: IUsersServiceFindOneById): Promise<User> {
    return this.usersRepository.findOne({ where: { id } });
  }

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

  async createOauthUser({
    id,
    nickname,
    provider,
  }: IUserServiceCreateOauthUser): Promise<User> {
    return this.usersRepository.save({
      nickname,
      email: id,
      password: String(id),
      provider,
    });
  }

  async update({ id, updateUserInput }: IUsersServiceUpdate): Promise<User> {
    const user = await this.findOneById({ id });

    return this.usersRepository.save({
      ...user,
      ...updateUserInput,
    });
  }

  async updatePassword({ id, password }): Promise<User> {
    const user = await this.findOneById({ id });

    const pwd = await bcrypt.hash(password, 10);

    return this.usersRepository.save({
      ...user,
      password: pwd,
    });
  }

  findLogin({ userId }: IUsersServiceFindLogin): Promise<User> {
    const user = this.usersRepository.findOne({ where: { id: userId } });
    return user;
  }

  async delete({ id }: IUsersServiceDelete): Promise<boolean> {
    const result = await this.usersRepository.softDelete({ id });
    console.log(result);
    return result.affected ? true : false;
  }
}
