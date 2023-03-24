import { Module } from "@nestjs/common";
import { UsersModule } from "src/users/users.module";
import { FilesResolver } from "./files.resolver";
import { FilesService } from "./files.service";

@Module({
  imports: [
    UsersModule, //
  ],
  providers: [
    FilesResolver, //
    FilesService,
  ],
})
export class FilesModule {}
