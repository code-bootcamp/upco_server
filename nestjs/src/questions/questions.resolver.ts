import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { IContext } from "src/common/interfaces/context";
import { CreateQuestionInput } from "./dto/create-question.input";
import { Question } from "./entities/question.entity";
import { QuestionService } from "./questions.service";

@Resolver()
export class QuestionResolver {
  constructor(
    private readonly questionService: QuestionService, //
  ) {}

  @Query(() => Question)
  fetchQuestion(
    @Context() context: IContext, //
    @Args("questionId") questionId: string, //
  ): Promise<Question> {
    const id = context.req.user.id;
    return this.questionService.fetchQuestion({ id, questionId });
  }

  @Query(() => [Question])
  fetchQuestions(
    @Context() context: IContext, //
  ): Promise<Question[]> {
    const id = context.req.user.id;
    return this.questionService.fetchQuestions({ id });
  }

  @Mutation(() => Question)
  createQuestion(
    @Context() context: IContext, //
    @Args("createQuestionInput") createQuestionInput: CreateQuestionInput, //
  ) {
    const id = context.req.user.id;
    return this.questionService.createQuestion({ id, createQuestionInput });
  }

  @Mutation(() => Boolean)
  deleteQuestion(
    @Context() context: IContext, //
    @Args("questionId") questionId: string, //
  ): Promise<boolean> {
    const id = context.req.user.id;
    return this.questionService.deleteQuestion({ id, questionId });
  }
}
