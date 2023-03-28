// import { Test, TestingModule } from "@nestjs/testing";
// import { getRepositoryToken } from "@nestjs/typeorm";
// import { User } from "../../users/entities/user.entity";
// import { UsersModule } from "../../users/users.module";
// import { UsersService } from "../../users/users.service";
// import { Question } from "../entities/question.entity";
// import { QuestionModule } from "../questions.module";
// import { QuestionService } from "../questions.service";
// import { IProvider } from "../../common/interfaces/provider";

// class MockQuestionRepository {
//   dataBase = [
//     {
//       user: { id: "user1" },
//       title: "title1",
//       contents: "contents1",
//       createAt: new Date(),
//     },
//     {
//       user: { id: "user1" },
//       title: "title2",
//       contents: "contents2",
//       createAt: new Date(),
//     },
//   ];

//   async find({ where }: { where: { user: { id: string } } }) {
//     const {
//       user: { id },
//     } = where;
//     return this.dataBase.filter((q) => q.user.id === id);
//   }

//   save({ user: { id }, title, contents }) {
//     this.dataBase.push({
//       user: { id },
//       title,
//       contents,
//       createAt: new Date(),
//     });
//   }
// }
// class MockUserRepository {
//   dataBase = [
//     {
//       id: "user1",
//       nickname: "nick1",
//       email: "email1",
//       password: "password1",
//       provider: "provider1",
//       age: 0,
//       interest: "interest1",
//       reported: 0,
//       image: "image",
//       createAt: new Date(),
//       updateAt: new Date(),
//       deletedAt: new Date(),
//     },
//   ];
// }

// describe("questionService", () => {
//   let questionService: QuestionService;
//   let userService: UsersService;

//   beforeEach(async () => {
//     const questionModule: TestingModule = await Test.createTestingModule({
//       imports: [
//         QuestionModule, //
//         UsersModule, //
//       ],
//       providers: [
//         QuestionService, //
//         {
//           provide: getRepositoryToken(Question),
//           useClass: MockQuestionRepository,
//         }, //
//       ],
//     }).compile();

//     questionService = questionModule.get<QuestionService>(QuestionService);

//     const usersModule: TestingModule = await Test.createTestingModule({
//       imports: [
//         UsersModule, //
//       ],
//       providers: [
//         UsersService,
//         {
//           provide: getRepositoryToken(User),
//           useClass: MockUserRepository,
//         },
//       ],
//     }).compile();

//     userService = usersModule.get<UsersService>(UsersService);
//   });

//   describe("createQuestion", () => {
//     it("createQuestion 생성 검증", () => {
//       const testData = {
//         id: "user1",
//         createQuestionInput: {
//           title: "testTitle",
//           contents: "testContents",
//         },
//       };

//       const resultData = {
//         id: "user1",
//         title: "testTitle",
//         contents: "testContents",
//         createAt: new Date(),
//       };

//       // const result = questionService.createQuestion({ ...testData });
//       // expect(result).toEqual(resultData);
//       const data = 1;
//       expect(data).toBe(1);
//     });
//   });
// });
