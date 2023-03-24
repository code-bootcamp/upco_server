import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";
import { FilesResolver } from "./files.resolver";
import { FilesService } from "./files.service";

@Module({
  imports: [
    User, //
    TypeOrmModule.forFeature([
      User, //
    ]),
  ],
  providers: [
    FilesResolver, //
    FilesService,
    UsersService,
  ],
})
export class FilesModule {}
