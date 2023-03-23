import { Injectable, NotAcceptableException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersService } from "src/users/users.service";
import { Repository } from "typeorm";
import { Question } from "./entities/question.entity";
import {
  ICreateQuestionServiceInput,
  IFetchQuestionsInput,
} from "./interfaces/question-service.interface";
@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>, //
    private readonly userService: UsersService, //
  ) {}

  checkEmpty(text: string): void {
    if (text.trim() === "") throw new NotAcceptableException();
  }

  createQuestion({
    id,
    createQuestionInput,
  }: ICreateQuestionServiceInput): Promise<Question> {
    const { title, contents } = createQuestionInput;

    const user = this.userService.findOneById({ id });
    if (!user) throw new NotAcceptableException();

    this.checkEmpty(title);
    this.checkEmpty(contents);

    return this.questionRepository.save({
      user: { id },
      title,
      contents,
    });
  }

  fetchQuestions({ id }: IFetchQuestionsInput): Promise<Question[]> {
    return this.questionRepository.find({ where: { user: { id } } });
  }
}
