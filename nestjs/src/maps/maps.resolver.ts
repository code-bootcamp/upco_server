import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { FindAroundUserInput } from "./dto/find-AroundUser.input";
import { SaveUserLocationInput } from "./dto/save-userLocation.input";
import { MapService } from "./maps.service";

@Resolver()
export class MapResolver {
  constructor(
    private readonly mapService: MapService, //
  ) {}

  // GraphQL return 값, typescript 추가할 예정입니다.
  @Query(() => String)
  findAroundUsers(
    @Args("location") findAroundUsersInput: FindAroundUserInput, //
  ) {
    return this.mapService.findLocation({ findAroundUsersInput });
  }

  @Mutation(() => String)
  saveUserLocation(
    @Args("email") email: string, //
    @Args("location") location: SaveUserLocationInput, //
  ): Promise<string> {
    return this.mapService.saveLocation({ email, location });
  }
}
