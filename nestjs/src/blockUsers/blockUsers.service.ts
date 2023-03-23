import { Injectable, NotAcceptableException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { BlockUser } from "./entities/blockUsers.entity";
import { IBlockUsersServiceDelete } from "./interfaces/block-service.interface";

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

  async createBlock({ userId, blockUserId }) {
    const user = await this.blockUsersRepository.findOne({
      where: {
        user: { id: userId },
        blockUserId: blockUserId,
      },
    });
    if (user) throw new NotAcceptableException();
    return this.blockUsersRepository.save({
      user: { id: userId },
      blockUserId,
    });
  }

  async deleteBlock({
    blockUserId,
  }: IBlockUsersServiceDelete): Promise<boolean> {
    const result = await this.blockUsersRepository.delete({
      blockUserId,
    });
    return result.affected ? true : false;
  }

  async createReport({ reportedId }) {
    const user = await this.usersRepository.findOne({
      where: { id: reportedId },
    });

    await this.usersRepository.update(
      { id: reportedId },
      { reported: user.reported + 1 },
    );
    return this.blockUsersRepository.save({
      reportedId,
    });
  }
}
