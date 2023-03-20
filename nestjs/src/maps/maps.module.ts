import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";
import { MapResolver } from "./maps.resolver";
import { MapService } from "./maps.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User, //
    ]),
  ],
  providers: [
    MapResolver, //
    MapService, //
    UsersService, //
  ],
})
export class MapModule {}
