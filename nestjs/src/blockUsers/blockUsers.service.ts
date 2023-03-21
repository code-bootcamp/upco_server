import { Injectable, NotAcceptableException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { BlockUser } from "./entities/blockUsers.entity";
import { IReportUserCreate } from "./interfaces/report-service.interface";

@Injectable()
export class BlockUserService {
  constructor(
    @InjectRepository(BlockUser)
    private readonly blockUsersRepository: Repository<BlockUser>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  findBlockOne({ blockUserId }) {
    return this.blockUsersRepository.findOne({ where: blockUserId });
  }

  findBlockAll() {
    return this.blockUsersRepository.find();
  }

  async createBlock({ userId, createBlockUserInput }) {
    const user = await this.blockUsersRepository.findOne({
      where: {
        blockUserId: createBlockUserInput.blockUserId,
      },
    });
    if (user) throw new NotAcceptableException();
    return this.blockUsersRepository.save({
      user: { id: userId },
      ...createBlockUserInput,
    });
  }

  // 실제 삭제로 변경하기
  async deleteBlock({ blockUserId }) {
    const result = await this.blockUsersRepository.softDelete({ blockUserId });
    console.log(result);
    return result.affected ? true : false;
  }

  // 신고
  async createReport({
    user: _user, //
    ...createReportInput
  }: IReportUserCreate): Promise<BlockUser> {
    // 유저 찾아오기
    const user = await this.usersRepository.findOne({
      where: { id: _user.id },
    });

    // 유저의 신고 누적수 업데이트
    await this.usersRepository.update(
      { id: _user.id },
      { reported: user.reported + 1 },
    );

    //
    return this.blockUsersRepository.save({
      ...createReportInput,
    });
  }
}
