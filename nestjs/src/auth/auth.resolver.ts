import { UseGuards } from "@nestjs/common/decorators";
import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";
import { PublicAccess } from "src/common/decorator/public-access";
import { IContext } from "src/common/interfaces/context";
import { AuthService } from "./auth.service";
import { GqlAuthRefressGuard } from "./guards/gql-auth.guard";

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService, //
  ) {}

  @PublicAccess()
  @Mutation(() => String)
  login(
    @Args("email") email: string,
    @Args("password") password: string,
    @Context() context: IContext,
  ): Promise<string> {
    return this.authService.login({
      email,
      password,
      res: context.res,
    });
  }

  @PublicAccess()
  @UseGuards(GqlAuthRefressGuard)
  @Mutation(() => String)
  restoreAccessToken(
    @Context() context: IContext, //
  ): string {
    return this.authService.restoreAccessToken({ user: context.req.user });
  }

  @Mutation(() => String)
  logout(@Context() context: IContext): Promise<string> {
    return this.authService.logout({
      req: context.req,
    });
  }
}
