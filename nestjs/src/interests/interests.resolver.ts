import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { PublicAccess } from "src/common/decorator/public-access";
import { CreateInterestInput } from "./dto/create-interest.dto.input";

import { Interest } from "./entities/interest.entity";
import { InterestsService } from "./interests.service";

@Resolver()
export class InterestsResolver {
  constructor(
    private readonly interestService: InterestsService, //
  ) {}

  @PublicAccess()
  @Query(() => [Interest])
  fetchInterests(): Promise<Interest[]> {
    return this.interestService.findAll();
  }

  @PublicAccess()
  @Query(() => Interest)
  fetchOneByInterest(
    @Args("interestId") interestId: string,
  ): Promise<Interest> {
    return this.interestService.findOne({ interestId });
  }

  @PublicAccess()
  @Mutation(() => Interest)
  createUserInterest(
    @Args("createInterestInput") createInterestInput: CreateInterestInput,
  ): Promise<Interest> {
    return this.interestService.create({ createInterestInput });
  }
}
