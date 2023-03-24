import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { PublicAccess } from "src/common/decorator/public-access";
import { IContext } from "src/common/interfaces/context";
import { FilesService } from "./files.service";

@Resolver()
export class FilesResolver {
  constructor(
    private readonly filesService: FilesService, //
  ) {}

  @PublicAccess()
  @Mutation(() => String)
  uploadFile(
    @Args({ name: "file", type: () => GraphQLUpload }) file: FileUpload,
  ): Promise<string> {
    return this.filesService.upload({ file });
  }
}
