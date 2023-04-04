import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { IContext } from "src/common/interfaces/context";

import { BlockUserService } from "./blocks.service";

import { Block } from "./entities/block.entity";

@Resolver()
export class BlockUserResolver {
  constructor(
    private readonly blockUsersService: BlockUserService, //
  ) {}

  @Query(() => [Block])
  fetchBlockUsers(
    @Context() context: IContext, //
  ): Promise<Block[]> {
    const userId = context.req.user.id;
    return this.blockUsersService.findBlocks({ userId });
  }

  @Mutation(() => Block)
  blockUser(
    @Context() context: IContext, //
    @Args("blockedUserId") blockedUserId: string,
  ): Promise<Block> {
    const userId = context.req.user.id;
    return this.blockUsersService.createBlock({ userId, blockedUserId });
  }

  @Mutation(() => Boolean)
  unblockUser(
    @Context() context: IContext, //
    @Args("blockId") blockId: string, //
  ): Promise<boolean> {
    const blockerId = context.req.user.id;
    return this.blockUsersService.deleteBlock({ id: blockId, blockerId });
  }
}
