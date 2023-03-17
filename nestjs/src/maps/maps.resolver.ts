import { Resolver } from "@nestjs/graphql";
import { MapService } from "./maps.service";

@Resolver()
export class MapResolver {
  constructor(
    private readonly mapService: MapService, //
  ) {}
}
