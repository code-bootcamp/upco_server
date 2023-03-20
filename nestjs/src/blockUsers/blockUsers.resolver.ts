import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
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
  fetchBlockOneOpponent(@Args("blockUser_id") blockUser_id: string) {
    return this.blockUsersService.findBlockOne({ blockUser_id });
  }

  @Query(() => [BlockUser])
  fetchBlockAllOpponent() {
    return this.blockUsersService.findBlockAll();
  }

  @Mutation(() => BlockUser)
  blockOpponent(
    @Args("createBlockUserInput") createBlockUserInput: CreateBlockUserInput, //
  ) {
    return this.blockUsersService.createBlock({ createBlockUserInput });
  }

  @Mutation(() => Boolean)
  unblockOpponent(@Args("blockUser_id") blockUser_id: string) {
    return this.blockUsersService.deleteBlock({ blockUser_id });
  }

  // 신고
  @Mutation(() => BlockUser)
  async reportOpponent(
    @Args("userId") userId: string,
    @Args("createReportInput") createReportInput: CreateReportInput, //
  ) {
    return this.blockUsersService.createReport({ userId, createReportInput });
  }
}
