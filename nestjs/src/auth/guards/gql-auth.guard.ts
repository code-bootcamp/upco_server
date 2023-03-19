import { Reflector } from "@nestjs/core";
import { ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

export class GqlAuthAccessGuard extends AuthGuard("access") {
  constructor(private readonly reflector: Reflector) {
    super();
  }
  getRequest(context: ExecutionContext) {
    const gqlContext = GqlExecutionContext.create(context);
    return gqlContext.getContext().req;
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get<boolean>(
      "isPublic",
      context.getHandler(),
    );

    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }
}

export class GqlAuthRefressGuard extends AuthGuard("refresh") {
  getRequest(context: ExecutionContext) {
    const gqlContext = GqlExecutionContext.create(context);
    return gqlContext.getContext().req;
  }
}
