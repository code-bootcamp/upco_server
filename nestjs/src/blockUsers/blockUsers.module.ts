import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BlockUserResolver } from "./blockUsers.resolver";
import { BlockUserService } from "./blockUsers.service";
import { BlockUser } from "./entities/\bblockUsers.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BlockUser, //
    ]),
  ],

  providers: [
    BlockUserResolver, //
    BlockUserService,
  ],
})
export class BlockUserModule {}
