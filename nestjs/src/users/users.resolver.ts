import { Args, Mutation, Resolver, Query, Context } from "@nestjs/graphql";
import { PublicAccess } from "src/common/decorator/public-access";
import { IContext } from "src/common/interfaces/context";
import { CreateUserInput } from "./dto/create-user.dto";
import { UpdateUserInput } from "./dto/update-user.dto";
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

  @PublicAccess()
  @Query(() => User)
  fetchUser(
    @Args("id") id: string, //
  ): Promise<User> {
    return this.usersService.findOneById({ id });
  }

  @Query(() => User)
  fetchLoginUser(
    @Context() context: IContext, //
  ): Promise<User> {
    const userId = context.req.user.id;
    return this.usersService.findLogin({ userId });
  }

  @Mutation(() => User)
  updateUser(
    @Context() context: IContext,
    @Args("updateUserInput")
    updateUserInput: UpdateUserInput,
  ): Promise<User> {
    const id = context.req.user.id;
    return this.usersService.update({ id, updateUserInput });
  }

  @Mutation(() => User)
  updateUserPwd(
    @Context() context: IContext,
    @Args("password") password: string,
  ): Promise<User> {
    const id = context.req.user.id;
    return this.usersService.updatePassword({ id, password });
  }

  @Mutation(() => Boolean)
  deleteUser(
    @Args("id") id: string, //
  ): Promise<boolean> {
    return this.usersService.delete({ id });
  }
}
