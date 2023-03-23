import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { IContext } from "src/common/interfaces/context";
import { FindAroundUserInput } from "./dto/find-AroundUser.input";
import { FindAroundUserOutput } from "./dto/find-AroundUser.output";
import { SaveUserLocationInput } from "./dto/save-userLocation.input";
import { IUserWithLocation } from "./interfaces/map-service.interface";
import { MapService } from "./maps.service";

@Resolver()
export class MapResolver {
  constructor(
    private readonly mapService: MapService, //
  ) {}

  // GraphQL return 값, typescript 추가할 예정입니다.
  @Query(() => [FindAroundUserOutput])
  findAroundUsers(
    @Args("bothLocation") findAroundUsersInput: FindAroundUserInput, //
  ): Promise<IUserWithLocation[]> {
    return this.mapService.findLocation({ findAroundUsersInput });
  }

  @Mutation(() => String)
  saveUserLocation(
    @Args("location") location: SaveUserLocationInput, //
    @Context() context: IContext,
  ): Promise<string> {
    return this.mapService.saveLocation({ context, location });
  }
}
