import { Args, Mutation, Resolver, Query, Context } from "@nestjs/graphql";
import { PublicAccess } from "src/common/decorator/public-access";
import { IContext } from "src/common/interfaces/context";
import { CreateUserInput } from "./dto/create-user.dto";
import { UpdateAllInput } from "./dto/update-all.input";
import { UpdateUserInput } from "./dto/update-user.input";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";

@Resolver()
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService, //
  ) {}

  @PublicAccess()
  @Mutation(() => User)
  createUser(
    @Args("createUserInput") createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.usersService.create({ createUserInput });
  }

  @PublicAccess()
  @Query(() => User)
  fetchId(
    @Args("email") email: string, //
  ): Promise<User> {
    return this.usersService.findOneByEmail({ email });
  }

  @Query(() => User)
  fetchLoginUser(
    @Context() context: IContext, //
  ): Promise<User> {
    const userId = context.req.user.id;
    return this.usersService.findLogin({ userId });
  }

  @PublicAccess()
  @Mutation(() => User)
  updateUserPwd(
    @Context() context: IContext,
    @Args("updateUserInput") updateUserInput: UpdateUserInput,
  ): Promise<User> {
    const id = context.req.user.id;
    console.log("✅", id);
    return this.usersService.update({ id, updateUserInput });
  }

  // 회원 정보 업데이트 (email, pwd, age, interest, friends, image)
  @Mutation(() => User)
  updateUser(
    @Context() context: IContext,
    @Args("updateAllInput") updateAllInput: UpdateAllInput,
  ): Promise<User> {
    const id = context.req.user.id;
    console.log("✅", id);
    return this.usersService.updateAll({ id, updateAllInput });
  }

  @Mutation(() => Boolean)
  deleteUser(
    @Args("id") id: string, //
  ): Promise<boolean> {
    return this.usersService.delete({ id });
  }

  // 친구 추가

  // 친구 목록 조회

  // 친구 삭제

  //
}
