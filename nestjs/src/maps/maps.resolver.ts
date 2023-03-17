import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { FindAroundUserInput } from "./dto/find-AroundUser.input";
import { MapService } from "./maps.service";

@Resolver()
export class MapResolver {
  constructor(
    private readonly mapService: MapService, //
  ) {}

  @Query(() => String)
  findAroundUsers(
    @Args("location") findAroundUsersInput: FindAroundUserInput, //
  ) {
    return this.mapService.findLocation({ findAroundUsersInput });
  }
}
