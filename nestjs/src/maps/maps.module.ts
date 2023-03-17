import { Module } from "@nestjs/common";
import { MapResolver } from "./maps.resolver";
import { MapService } from "./maps.service";

@Module({
  providers: [
    MapResolver, //
    MapService, //
  ],
})
export class MapModule {}
