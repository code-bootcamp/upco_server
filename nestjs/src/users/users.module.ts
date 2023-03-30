import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Interest } from "src/interests/entities/interest.entity";
import { InterestsService } from "src/interests/interests.service";
import { User } from "./entities/user.entity";
import { UsersResolver } from "./users.resolver";
import { UsersService } from "./users.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User, //
      Interest,
    ]),
  ],

  providers: [
    UsersResolver, //
    UsersService,
    InterestsService,
  ],

  exports: [
    UsersService, //
  ],
})
export class UsersModule {}
