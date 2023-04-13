import { Injectable, NotAcceptableException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersService } from "src/users/users.service";
import { Repository } from "typeorm";
import { Block } from "./entities/block.entity";
import {
  IBlcosServiceCreate,
  IBlcosServiceDelete,
  IBlocksServiceFindBlocks,
  IBlocksServiceFindOneByIdAndBlockerId,
  IBlocksServiceFindOneByBlockerIdAndBlockedUserId,
} from "./interfaces/block-service.interface";

@Injectable()
export class BlockUserService {
  constructor(
    @InjectRepository(Block)
    private readonly blocksRepository: Repository<Block>,

    private readonly userService: UsersService, //
  ) {}

  async findBlocks({ userId }: IBlocksServiceFindBlocks): Promise<Block[]> {
    return this.blocksRepository.find({
      where: {
        blocker: {
          id: userId,
        },
      },
      relations: ["blocked_user", "blocker"],
    });
  }

  async findOneByIdAndBlockerId({
    id,
    blockerId,
  }: IBlocksServiceFindOneByIdAndBlockerId): Promise<Block> {
    return this.blocksRepository.findOne({
      where: {
        id,
        blocker: {
          id: blockerId,
        },
      },
    });
  }

  async findOneByBlockerIdAndBlockedUserId({
    blockerId,
    blockedUserId,
  }: IBlocksServiceFindOneByBlockerIdAndBlockedUserId): Promise<Block> {
    return this.blocksRepository.findOne({
      where: {
        blocker: {
          id: blockerId,
        },
        blocked_user: {
          id: blockedUserId,
        },
      },
    });
  }

  async createBlock({
    userId,
    blockedUserId,
  }: IBlcosServiceCreate): Promise<Block> {
    if (blockedUserId === userId) throw new NotAcceptableException("");

    const blockUser = await this.userService.findOneById({
      userId: blockedUserId,
    });

    if (!blockUser) throw new NotAcceptableException("");

    const block = await this.findOneByBlockerIdAndBlockedUserId({
      blockerId: userId,
      blockedUserId,
    });

    if (block) throw new NotAcceptableException("");

    return this.blocksRepository.save({
      blocker: {
        id: userId,
      },
      blocked_user: {
        id: blockedUserId,
      },
    });
  }

  async deleteBlock({ id, blockerId }: IBlcosServiceDelete): Promise<boolean> {
    const isVerify = await this.findOneByBlockerIdAndBlockedUserId({
      blockerId,
      blockedUserId: id,
    });

    if (!isVerify) throw new NotAcceptableException();

    const result = await this.blocksRepository.delete({ id: isVerify.id });

    return result.affected ? true : false;
  }
}
