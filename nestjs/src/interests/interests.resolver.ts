import { Resolver, Mutation, Query, Args } from "@nestjs/graphql";
import { Interest } from "./entities/interest.entity";
import { InterestsService } from "./interests.service";

@Resolver()
export class InterestsResolver {
  constructor(
    private readonly interestService: InterestsService, //
  ) {}

  @Mutation(() => String)
  createDefaultInterests(): Promise<string> {
    return this.interestService.create();
  }
}
