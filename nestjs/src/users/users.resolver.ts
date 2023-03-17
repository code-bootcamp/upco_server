import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver, Query, Context } from "@nestjs/graphql";
import { GqlAuthGuard } from "src/auth/guards/gql-auth.guard";
import { IContext } from "src/common/interfaces/context";
import { CreateUserInput } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";

@Resolver()
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService, //
  ) {}

  @Mutation(() => User)
  createUser(
    @Args("createUserInput") createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.usersService.create({ createUserInput });
  }

  @Query(() => User)
  fetchId(
    @Args("email") email: string, //
  ): Promise<User> {
    return this.usersService.findOneByEmail({ email });
  }

  // 나의정보확인

  @UseGuards(GqlAuthGuard("access"))
  @Query(() => User)
  fetchLoginUser(
    @Context() context: IContext, //
  ): Promise<User> {
    const userId = context.req.user.userId;
    console.log("📌", context.req.user);
    return this.usersService.findLogin({ userId });
  }

  // 비밀번호 재설정
  // 회원 정보 업데이트
}
