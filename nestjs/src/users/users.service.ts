import {
  CACHE_MANAGER,
  ConflictException,
  Inject,
  Injectable,
} from "@nestjs/common";
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
  IUsersServiceFindOneById,
  IUsersServiceGetHashedPwd,
  IUsersServiceUpdate,
  IUsersServiceVerifyEmail,
} from "./interfaces/user-service.interface";
import { Cache } from "cache-manager";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async findOneById({ id }: IUsersServiceFindOneById): Promise<User> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async findOneByEmail({ email }: IUsersServiceFindOneByEmail): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }

  getHashedPwd({ password }: IUsersServiceGetHashedPwd): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async create({ createUserInput }: IUsersServiceCreate): Promise<User> {
    const { nickname, email, password } = createUserInput;
    const user = await this.findOneByEmail({ email });
    if (user) throw new ConflictException("이미 등록된 이메일입니다!");
    const hashedPassword = await this.getHashedPwd({ password });
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

    const result = await this.usersRepository.save({
      ...user,
      ...updateUserInput,
    });

    return result;
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

  async verifyEmail({
    email,
    code,
  }: IUsersServiceVerifyEmail): Promise<boolean> {
    const savedCode = await this.cacheManager.get(email);

    return savedCode === code;
  }
}
