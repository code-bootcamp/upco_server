import { Injectable, NotAcceptableException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersService } from "src/users/users.service";
import { Repository } from "typeorm";
import { Question } from "./entities/question.entity";
import {
  ICreateQuestionServiceInput,
  IFetchQuestionInput,
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
    if (text.trim() === "" || text[0] === " " || text.at(-1) === " ")
      throw new NotAcceptableException();
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

  fetchQuestion({ id, questionId }: IFetchQuestionInput): Promise<Question> {
    const user = this.userService.findOneById({ id });
    if (!user) throw new NotAcceptableException();
    return this.questionRepository.findOne({ where: { id: questionId } });
  }

  fetchQuestions({ id }: IFetchQuestionsInput): Promise<Question[]> {
    return this.questionRepository.find({ where: { user: { id } } });
  }

  async deleteQuestion({ id, questionId }) {
    const user = this.userService.findOneById({ id });
    if (!user) throw new NotAcceptableException();
    const result = await this.questionRepository.softDelete({ id: questionId });
    return result.affected ? true : false;
  }
}
