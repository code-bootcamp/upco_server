import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "src/users/users.module";
import { Friend } from "./entities/friend.entity";
import { FriendsResolver } from "./friends.resolver";
import { FriendsService } from "./friends.service";

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([
      Friend, //
    ]),
  ],
  providers: [
    FriendsResolver, //
    FriendsService,
  ],
})
export class FriendsModule {}
