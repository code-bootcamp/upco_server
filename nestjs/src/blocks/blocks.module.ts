import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "src/users/users.module";
import { BlockUserResolver } from "./blocks.resolver";
import { BlockUserService } from "./blocks.service";
import { Block } from "./entities/block.entity";

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([
      Block, //
    ]),
  ],

  providers: [
    BlockUserResolver, //
    BlockUserService,
  ],
})
export class BlockUserModule {}
