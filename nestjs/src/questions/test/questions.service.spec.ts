import { NotAcceptableException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { UsersService } from "../../users/users.service";
import { Question } from ".././entities/question.entity";
import { QuestionService } from "../questions.service";
import { v4 as uuidv4 } from "uuid";
import { ObjectType } from "@nestjs/graphql";
import {
  ICreateQuestionServiceInput,
  IFetchQuestionsInput,
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

  find({ id }: IFetchQuestionsInput): MockQuestion[] {
    return this.database.filter((question) => question.user === id);
  }

  save({ id, createQuestionInput }: ICreateQuestionServiceInput) {
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

    it("id가 존재하지 않을 시 error 반환해야 함", () => {
      const id = "isNotExistId";
      try {
        userService.findOneById({ id });
      } catch (error) {
        expect(error).toBeInstanceOf(NotAcceptableException);
      }
    });

    it("checkEmpty 함수 전체 공백 시 error 반환해야 함", () => {
      const title = "   ";
      try {
        questionService.checkEmpty(title);
        fail("예외 미발생 시 fail");
      } catch (error) {
        expect(error).toBeInstanceOf(NotAcceptableException);
      }
    });

    it("checkEmpty 함수 맨 앞 공백 시 error 반환해야 함", () => {
      const title = " a";
      try {
        questionService.checkEmpty(title);
        fail("예외 미발생 시 fail");
      } catch (error) {
        expect(error).toBeInstanceOf(NotAcceptableException);
      }
    });

    it("checkEmpty 함수 맨 뒤 공백 시 error 반환해야 함", () => {
      const content = "a   ";
      try {
        questionService.checkEmpty(content);
        fail("예외 미발생 시 fail");
      } catch (error) {
        expect(error).toBeInstanceOf(NotAcceptableException);
      }
    });
  });

  describe("fetchQuestion", () => {
    it("fetchQuestion 함수 실행 시 id에 해당하는 데이터 가져와야 함", () => {
      const id = "user1";
      const mockQuestionRepository = new MockQuestionRepository();
      const result = mockQuestionRepository.find({ id });

      expect(result).toEqual(
        mockQuestionRepository.database.filter(
          (question) => question.user === id,
        ),
      );
    });
  });
});
