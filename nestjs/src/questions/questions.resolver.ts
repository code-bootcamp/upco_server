import { Query, Resolver } from "@nestjs/graphql";
import { PublicAccess } from "src/common/decorator/public-access";
import { QuestionService } from "./questions.service";

@Resolver()
export class QuestionResolver {
  constructor(
    private readonly questionService: QuestionService, //
  ) {}

  @Query(() => String)
  test1() {
    return "test1";
  }
}
