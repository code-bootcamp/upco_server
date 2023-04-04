import { CacheModule, NotAcceptableException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Interest } from "src/interests/entities/interest.entity";
import { InterestsService } from "src/interests/interests.service";
import { User } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";
import { Question } from "../entities/question.entity";
import { QuestionService } from "../questions.service";
import {
  MockInterestRepository,
  MockQuestionRepository,
  MockUserRepository,
} from "./questions-mock.DB";

const id = new MockQuestionRepository().database[0].user;
const questionId = new MockQuestionRepository().database[0].id;

describe("questions.service", () => {
  let questionService: QuestionService;

  beforeEach(async () => {
    const mockModule: TestingModule = await Test.createTestingModule({
      imports: [
        CacheModule.register({}), //
      ],
      providers: [
        QuestionService, //
        UsersService, //
        InterestsService, //
        {
          provide: getRepositoryToken(Question),
          useClass: MockQuestionRepository,
        },
        {
          provide: getRepositoryToken(User),
          useClass: MockUserRepository,
        },
        {
          provide: getRepositoryToken(Interest),
          useClass: MockInterestRepository,
        },
      ],
    }).compile();

    questionService = mockModule.get<QuestionService>(QuestionService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("createQuestion", () => {
    const createQuestionInput = {
      title: "test-title",
      contents: "test-contents",
    };
    it("정상 작동 시 question 반환", async () => {
      const result = await questionService.createQuestion({
        id,
        createQuestionInput,
      });

      expect(result).toStrictEqual({
        id: expect.any(String),
        user: "user1",
        title: "test-title",
        contents: "test-contents",
        createAt: expect.any(Date),
      });
    });

    it("아이디값 올바르지 않을 시 에러 반환", async () => {
      const id = "notExistId";

      try {
        await questionService.createQuestion({
          id,
          createQuestionInput,
        });
      } catch (error) {
        expect(error).toBeInstanceOf(NotAcceptableException);
      }
    });
  });

  describe("checkEmpty", () => {
    it("전체 공백 시 에러 반환 함", () => {
      const text = "  ";
      expect(() => questionService.checkEmpty(text)).toThrow(
        NotAcceptableException,
      );
    });

    it("맨 앞 공백 시 error 반환해야 함", () => {
      const text = " a";
      expect(() => questionService.checkEmpty(text)).toThrow(
        NotAcceptableException,
      );
    });

    it("정상 데이터 입력 시 반환값 없음", () => {
      const text = "aa";
      const result = questionService.checkEmpty(text);
      expect(result).toBeUndefined();
    });
  });
  describe("fetchQuestion", () => {
    it("questionId에 해당하는 데이터 가져와야 함", () => {
      const result = questionService.fetchQuestion({ id, questionId });
      expect(result).toEqual({
        id: "question1",
        title: "title1",
        user: "user1",
        contents: "contents1",
        createAt: new Date("2022-01-01T00:00:00.000Z"),
      });
    });
  });

  describe("fetchQuestions", () => {
    it("fetchQuestions 함수 실행 시 id에 해당하는 데이터 가져와야 함", async () => {
      const result = await questionService.fetchQuestions({ id });

      expect(result).toEqual([
        {
          id: "question2",
          title: "title2",
          user: "user1",
          contents: "contents2",
          createAt: new Date("2023-01-01T00:00:00.000Z"),
        },
        {
          id: "question1",
          title: "title1",
          user: "user1",
          contents: "contents1",
          createAt: new Date("2022-01-01T00:00:00.000Z"),
        },
      ]);
    });
  });

  describe("extractNumberFromDate", () => {
    it("extractNumberFromDate 함수에 date 객체 입력 시 숫자를 추출하여 반환해야 함", () => {
      const date = new Date("2022-01-01T00:00:00.000Z");
      const result = questionService.extractNumberFromDate(date);
      const expectResult = 20220101000000000;

      expect(result).toBe(expectResult);
    });
  });

  describe("deleteQuestion", () => {
    it("questionId에 해당하는 데이터가 삭제되어야 함", async () => {
      const result = await questionService.deleteQuestion({ id, questionId });

      expect(result).toBe(true);
    });
  });
});
