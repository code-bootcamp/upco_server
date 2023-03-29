import { Injectable, NotAcceptableException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersService } from "src/users/users.service";
import { Repository } from "typeorm";
import { Question } from "./entities/question.entity";
import {
  IQuestionServiceCreateQuestion,
  IQuestionServiceDeleteQuestion,
  IQuestionServiceFetchQuestion,
  IQuestionServiceFetchQuestions,
} from "./interfaces/question-service.interface";
@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>, //
    private readonly userService: UsersService, //
  ) {}

  // 주어진 text의 앞뒤 공백, 전체 공백을 체크하는 로직입니다.
  checkEmpty(text: string): void {
    if (text.trim() === "" || text[0] === " " || text.at(-1) === " ")
      throw new NotAcceptableException();
  }

  createQuestion({
    id,
    createQuestionInput,
  }: IQuestionServiceCreateQuestion): Promise<Question> {
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

  fetchQuestion({
    id,
    questionId,
  }: IQuestionServiceFetchQuestion): Promise<Question> {
    const user = this.userService.findOneById({ id });
    if (!user) throw new NotAcceptableException();
    return this.questionRepository.findOne({ where: { id: questionId } });
  }

  async fetchQuestions({
    id,
  }: IQuestionServiceFetchQuestions): Promise<Question[]> {
    const result = await this.questionRepository.find({
      where: { user: { id } },
    });

    // extractNumberFromDate => Date를 number로 전환하는 로직입니다.
    return result.sort(
      (a, b) =>
        this.extractNumberFromDate(b.createAt) -
        this.extractNumberFromDate(a.createAt),
    );
  }

  async deleteQuestion({
    id,
    questionId,
  }: IQuestionServiceDeleteQuestion): Promise<boolean> {
    const user = this.userService.findOneById({ id });
    if (!user) throw new NotAcceptableException();
    const result = await this.questionRepository.softDelete({ id: questionId });
    return result.affected ? true : false;
  }

  extractNumberFromDate(date: Date): number {
    return Number(date.toISOString().replace(/\D/g, ""));
  }
}
