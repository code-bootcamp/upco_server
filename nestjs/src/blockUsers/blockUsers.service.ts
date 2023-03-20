import { Injectable, NotAcceptableException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BlockUser } from "./entities/\bblockUsers.entity";

@Injectable()
export class BlockUserService {
  constructor(
    @InjectRepository(BlockUser)
    private readonly blockUsersRepository: Repository<BlockUser>,
  ) {}

  findBlockOne({ blockUser_id }) {
    return this.blockUsersRepository.findOne({ where: blockUser_id });
  }

  findBlockAll() {
    return this.blockUsersRepository.find();
  }

  async createBlock({ createBlockUserInput }) {
    const user = await this.blockUsersRepository.findOne({
      where: {
        blockUser_id: createBlockUserInput.blockUser_id,
      },
    });
    if (user) throw new NotAcceptableException();
    return this.blockUsersRepository.save({ ...createBlockUserInput });
  }

  async deleteBlock({ blockUser_id }) {
    const result = await this.blockUsersRepository.softDelete({ blockUser_id });
    console.log(result);
    return result.affected ? true : false;
  }

  async createReport({ userId, createReportInput }) {
    return this.blockUsersRepository.save({
      user: { id: userId },
      ...createReportInput,
    });
  }
}
