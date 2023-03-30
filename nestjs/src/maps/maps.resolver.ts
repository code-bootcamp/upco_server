import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { IContext } from "src/common/interfaces/context";
import { FindAroundUserInput } from "./dto/find-AroundUser.input";
import { UserWithLocation } from "./dto/find-AroundUser.output";
import { SaveUserLocationInput } from "./dto/save-userLocation.input";
import { IUserWithLocation } from "./interfaces/map-service.interface";
import { MapService } from "./maps.service";

@Resolver()
export class MapResolver {
  constructor(
    private readonly mapService: MapService, //
  ) {}

  @Query(() => [UserWithLocation])
  findAroundUsers(
    @Args("interest", { nullable: true }) interest: string = null, //
    @Args("bothLocation") findAroundUsersInput: FindAroundUserInput, //
  ): Promise<IUserWithLocation[]> {
    return this.mapService.findLocation({ interest, findAroundUsersInput });
  }

  @Mutation(() => String)
  saveUserLocation(
    @Args("location") location: SaveUserLocationInput, //
    @Context() context: IContext,
  ): Promise<string> {
    return this.mapService.saveLocation({ context, location });
  }
}
