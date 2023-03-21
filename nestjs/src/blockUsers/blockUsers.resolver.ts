import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { IContext } from "src/common/interfaces/context";
import { BlockUserService } from "./blockUsers.service";
import { CreateBlockUserInput } from "./dto/create-block.input";
import { CreateReportInput } from "./dto/create-report.input";
import { BlockUser } from "./entities/\bblockUsers.entity";

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
    @Args("createBlockUserInput") createBlockUserInput: CreateBlockUserInput, //
  ) {
    return this.blockUsersService.createBlock({ userId, createBlockUserInput });
  }

  unblockOpponent(@Args("blockUserId") blockUserId: string) {
    return this.blockUsersService.deleteBlock({ blockUserId });
  }

  // 신고
  @Mutation(() => BlockUser)
  async reportOpponent(
    @Context() context: IContext,
    @Args("createReportInput") createReportInput: CreateReportInput, //
  ): Promise<BlockUser> {
    const user = context.req.user;
    return this.blockUsersService.createReport({ user, ...createReportInput });
  }
}
