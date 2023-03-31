import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { Friend } from "./entities/friend.entity";
import { FriendsResolver } from "./friends.resolver";
import { FriendsService } from "./friends.service";

@Module({
  imports: [
    User,
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
