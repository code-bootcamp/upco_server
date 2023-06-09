import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateNoticeInput } from "./dto/create-notice.input";
import { Notice } from "./entites/notice.entity";
import { NoticesService } from "./notices.service";

@Resolver()
export class NoticesResolver {
  constructor(
    private readonly noticesService: NoticesService, //
  ) {}

  @Query(() => [Notice], { nullable: true })
  fetchNotices(): Promise<Notice[]> {
    return this.noticesService.noticeFindAll();
  }

  @Query(() => Notice)
  fetchNotice(@Args("id") id: string): Promise<Notice> {
    return this.noticesService.noticeFindOne({ id });
  }

  @Mutation(() => Notice)
  createNotice(
    @Args("createNoticeInput") createNoticeInput: CreateNoticeInput,
  ): Promise<Notice> {
    return this.noticesService.createNotice({ createNoticeInput });
  }
}
