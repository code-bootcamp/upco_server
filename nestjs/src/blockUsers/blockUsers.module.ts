import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { BlockUserResolver } from "./blockUsers.resolver";
import { BlockUserService } from "./blockUsers.service";
import { BlockUser } from "./entities/blockUsers.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BlockUser, //
      User,
    ]),
  ],

  providers: [
    BlockUserResolver, //
    BlockUserService,
  ],
})
export class BlockUserModule {}
