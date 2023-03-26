import { Module } from "@nestjs/common";
import { UsersModule } from "src/users/users.module";
import { MapResolver } from "./maps.resolver";
import { MapService } from "./maps.service";

@Module({
  imports: [
    UsersModule, //
  ],
  providers: [
    MapResolver, //
    MapService, //
  ],
})
export class MapModule {}
