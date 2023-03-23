import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

import { User } from "src/users/entities/user.entity";
import { BlockUserService } from "./blockUsers.service";

import { BlockUser } from "./entities/blockUsers.entity";

@Resolver()
export class BlockUserResolver {
  constructor(
    private readonly blockUsersService: BlockUserService, //
  ) {}

  @Query(() => BlockUser)
  fetchBlockOneOpponent(@Args("blockUserId") blockUserId: string) {
    return this.blockUsersService.findBlockOne({ blockUserId });
  }

  @Query(() => [BlockUser])
  fetchBlockAllOpponent() {
    return this.blockUsersService.findBlockAll();
  }

  @Mutation(() => BlockUser)
  blockOpponent(
    @Args("userId") userId: string,
    @Args("blockUserId") blockUserId: string, //
  ) {
    return this.blockUsersService.createBlock({ userId, blockUserId });
  }

  @Mutation(() => Boolean)
  unblockOpponent(@Args("blockUserId") blockUserId: string): Promise<boolean> {
    return this.blockUsersService.deleteBlock({ blockUserId });
  }

  @Mutation(() => User)
  async reportOpponent(
    @Args("reportedId") reportedId: string, //
  ) {
    return this.blockUsersService.createReport({
      reportedId,
    });
  }
}
