import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { PublicAccess } from "src/common/decorator/public-access";
import { FilesService } from "./files.service";

@Resolver()
export class FilesResolver {
  constructor(
    private readonly filesService: FilesService, //
  ) {}

  @PublicAccess()
  @Mutation(() => String)
  uploadFile(
    @Args({ name: "files", type: () => [GraphQLUpload] }) files: FileUpload[],
  ): string {
    return this.filesService.upload({ files });
  }
}
