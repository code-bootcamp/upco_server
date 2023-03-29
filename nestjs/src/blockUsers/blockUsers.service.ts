import { Injectable, NotAcceptableException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { BlockUser } from "./entities/blockUsers.entity";
import {
  IBlockUsersServiceCreate,
  IBlockUsersServiceDelete,
  IReportUsersServiceCreate,
} from "./interfaces/block-service.interface";

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

  async createBlock({
    userId,
    blockUserId,
  }: IBlockUsersServiceCreate): Promise<string> {
    if (blockUserId === userId)
      throw new NotAcceptableException("동일한 ID는 차단 대상이 아닙니다.");

    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotAcceptableException("존재하지 않은 유저");

    const blockUser = await this.usersRepository.findOne({
      where: { id: blockUserId },
    });
    if (!blockUser) throw new NotAcceptableException("존재하지 않은 상대방");

    const result = await this.blockUsersRepository.findOne({
      where: {
        user: { id: userId },
        blockUserId: blockUserId,
      },
    });

    if (result) {
      throw new NotAcceptableException("이미 차단된 ID 입니다.");
    }

    await this.blockUsersRepository.save({
      user: { id: userId },
      blockUserId,
    });

    return "성공적으로 차단되었습니다.";
  }

  async deleteBlock({
    blockUserId,
  }: IBlockUsersServiceDelete): Promise<boolean> {
    const result = await this.blockUsersRepository.delete({
      blockUserId,
    });
    return result.affected ? true : false;
  }

  async createReport({
    reportedId,
    userId,
  }: IReportUsersServiceCreate): Promise<string> {
    if (reportedId === userId)
      throw new NotAcceptableException("동일한 ID는 차단 대상이 아닙니다.");

    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotAcceptableException("존재하지 않은 유저");

    const reportedUser = await this.usersRepository.findOne({
      where: { id: reportedId },
    });
    if (!reportedUser) throw new NotAcceptableException("존재하지 않은 상대방");

    const reported = await this.blockUsersRepository.findOne({
      where: { reportedId },
    });

    if (reported) {
      throw new NotAcceptableException("이미 신고된 ID 입니다.");
    }

    await this.usersRepository.update(
      { id: reportedId },
      { reported: reportedUser.reported + 1 },
    );
    await this.blockUsersRepository.save({
      reportedId,
      user: { id: userId },
    });

    return "신고가 완료되었습니다.";
  }
}
