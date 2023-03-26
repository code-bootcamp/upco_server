import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { IContext } from "src/common/interfaces/context";
import { FilesService } from "./files.service";

@Resolver()
export class FilesResolver {
  constructor(
    private readonly filesService: FilesService, //
  ) {}

  @Mutation(() => String)
  uploadFile(
    @Context() context: IContext, //
    @Args({ name: "file", type: () => GraphQLUpload }) file: FileUpload,
  ): Promise<string> {
    const id = context.req.user.id;
    return this.filesService.upload({ id, file });
  }
}
