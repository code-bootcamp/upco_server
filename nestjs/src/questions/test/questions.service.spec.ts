import { NotAcceptableException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { UsersService } from "../../users/users.service";
import { Question } from ".././entities/question.entity";
import { QuestionService } from "../questions.service";
import { v4 as uuidv4 } from "uuid";
import { ObjectType } from "@nestjs/graphql";
import {
  IQuestionServiceCreateQuestion,
  IQuestionServiceFetchQuestions,
} from "../interfaces/question-service.interface";

@ObjectType()
class MockQuestion {
  id: string;
  title: string;
  user: string;
  contents: string;
  createAt: Date;
}
class MockQuestionRepository {
  database = [
    {
      id: "question1",
      title: "title1",
      user: "user1",
      contents: "contents1",
      createAt: new Date(),
    },
    {
      id: "question2",
      title: "title2",
      user: "user1",
      contents: "contents2",
      createAt: new Date(),
    },
    {
      id: "question3",
      title: "title3",
      user: "user2",
      contents: "contents3",
      createAt: new Date(),
    },
  ];

  find({ id }: IQuestionServiceFetchQuestions): MockQuestion[] {
    return this.database.filter((question) => question.user === id);
  }

  findOne({ questionId }): MockQuestion {
    return this.database.find((question) => question.id === questionId);
  }

  save({
    id,
    createQuestionInput,
  }: IQuestionServiceCreateQuestion): MockQuestion {
    const newQuestion = new MockQuestion();
    const { title, contents } = createQuestionInput;
    newQuestion.id = uuidv4();
    newQuestion.user = id;
    newQuestion.title = title;
    newQuestion.contents = contents;
    newQuestion.createAt = new Date();

    this.database.push(newQuestion);

    return newQuestion;
  }

  softDelete({ questionId }): boolean {
    const index = this.database.findIndex((item) => item.id === questionId);
    this.database.splice(index, 1);
    const result = this.findOne({ questionId });
    return !result ? true : false;
  }
}
describe("QuestionService", () => {
  let questionService: QuestionService;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionService,
        {
          provide: getRepositoryToken(Question),
          useClass: MockQuestionRepository,
        },
        {
          provide: UsersService,
          useValue: {
            findOneById: jest.fn(),
          },
        },
      ],
    }).compile();

    questionService = module.get<QuestionService>(QuestionService);
    userService = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("createQuestion", () => {
    it("createQuestion 실행 시 정상적으로 저장되어야 함", () => {
      const mockQuestionRepository = new MockQuestionRepository();
      const id = "user1";
      const createQuestionInput = {
        title: "testTitle",
        contents: "testContents",
      };

      const result = mockQuestionRepository.save({
        id,
        createQuestionInput,
      });

      expect(result).toEqual({
        id: expect.any(String),
        user: "user1",
        title: "testTitle",
        contents: "testContents",
        createAt: expect.any(Date),
      });
    });
    describe("checkEmpty", () => {
      it("checkEmpty 함수 전체 공백 시 error 반환해야 함", () => {
        const text = "   ";
        expect(() => questionService.checkEmpty(text)).toThrow(
          NotAcceptableException,
        );
      });

      it("checkEmpty 함수 맨 앞 공백 시 error 반환해야 함", () => {
        const text = " a";
        expect(() => questionService.checkEmpty(text)).toThrow(
          NotAcceptableException,
        );
      });
    });
  });

  describe("fetchQuestion", () => {
    it("fetchQuestion 함수 실행 시 questionId에 해당하는 데이터 가져와야 함", () => {
      const questionId = "question1";
      const mockQuestionRepository = new MockQuestionRepository();
      const result = mockQuestionRepository.findOne({ questionId });
      expect(result).toEqual({
        id: "question1",
        title: "title1",
        user: "user1",
        contents: "contents1",
        createAt: expect.any(Date),
      });
    });
  });

  describe("fetchQuestions", () => {
    it("fetchQuestions 함수 실행 시 id에 해당하는 데이터 가져와야 함", () => {
      const id = "user1";
      const mockQuestionRepository = new MockQuestionRepository();
      const result = mockQuestionRepository.find({ id });

      expect(result).toEqual(
        mockQuestionRepository.database.filter(
          (question) => question.user === id,
        ),
      );
    });

    describe("extractNumberFromDate", () => {
      it("extractNumberFromDate 함수에 date 객체 입력 시 숫자를 추출하여 반환해야 함", () => {
        const date = new Date("2022-01-01T00:00:00.000Z");
        const result = questionService.extractNumberFromDate(date);
        const expectResult = 20220101000000000;

        expect(result).toBe(expectResult);
      });
    });
  });

  describe("deleteQuestion", () => {
    it("deleteQuestion 실행 시 questionId에 해당하는 데이터가 삭제되어야 함", () => {
      const questionId = "question1";
      const mockQuestionRepository = new MockQuestionRepository();

      const result = mockQuestionRepository.softDelete({ questionId });
      expect(result).toBe(true);
    });
  });
});
