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
import { InterestsService } from "src/interests/interests.service";
import { Interest } from "src/interests/entities/interest.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,

    private readonly interestsService: InterestsService,
  ) {}

  async findOneByIdWithInterests({
    id,
  }: IUsersServiceFindOneById): Promise<User> {
    return this.usersRepository.findOne({
      where: { id },
      relations: ["interests"],
    });
  }

  async findOneByEmail({ email }: IUsersServiceFindOneByEmail): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findOneById({ userId }: IUsersServiceFindLogin): Promise<User> {
    return this.usersRepository.findOne({ where: { id: userId } });
  }

  getHashedPwd({ password }: IUsersServiceGetHashedPwd): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async create({ createUserInput }: IUsersServiceCreate): Promise<User> {
    const { nickname, email, password } = createUserInput;
    const user = await this.findOneByEmail({ email });
    if (user) throw new ConflictException();
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
    const user = await this.findOneByIdWithInterests({ id });

    const { interests, ...rest } = updateUserInput;

    let savedInterests: Interest[] | null;

    if (interests) {
      savedInterests = await this.interestsService.findByNames({
        names: interests,
      });
    }

    const result = await this.usersRepository.save({
      ...user,
      ...rest,
      interests: savedInterests || user.interests,
    });

    return result;
  }

  async updatePassword({ id, password }): Promise<string> {
    const pwd = await bcrypt.hash(password, 10);

    await this.usersRepository.save({
      id,
      password: pwd,
    });

    return "저장 완료";
  }

  async delete({ id }: IUsersServiceDelete): Promise<boolean> {
    const result = await this.usersRepository.softDelete({ id });
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
