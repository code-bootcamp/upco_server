import { ObjectType } from "@nestjs/graphql";
import { IQuestionServiceFetchQuestions } from "../interfaces/question-service.interface";
import { v4 as uuid } from "uuid";
import {
  IUsersServiceFindOneById,
  IUsersServiceUpdate,
} from "src/users/interfaces/user-service.interface";
import { NotAcceptableException } from "@nestjs/common";

@ObjectType()
export class MockQuestion {
  id: string;
  title: string;
  user: string;
  contents: string;
  createAt: Date;
}
export class MockQuestionRepository {
  database = [
    {
      id: "question1",
      title: "title1",
      user: "user1",
      contents: "contents1",
      createAt: new Date("2022-01-01T00:00:00.000Z"),
    },
    {
      id: "question2",
      title: "title2",
      user: "user1",
      contents: "contents2",
      createAt: new Date("2023-01-01T00:00:00.000Z"),
    },
    {
      id: "question3",
      title: "title3",
      user: "user2",
      contents: "contents3",
      createAt: new Date("2022-06-01T00:00:00.000Z"),
    },
  ];

  find({ id }: IQuestionServiceFetchQuestions): MockQuestion[] {
    id = "user1";
    return this.database
      .filter((question) => question.user === id)
      .sort(
        (a, b) =>
          this.extractNumberFromDate(b.createAt) -
          this.extractNumberFromDate(a.createAt),
      );
  }

  findOne({ questionId }): MockQuestion {
    questionId = "question1";
    return this.database.find((question) => question.id === questionId);
  }

  save({ id, title, contents }) {
    id = "user1";

    this.database.push({
      user: id,
      title,
      contents,
      id: uuid(),
      createAt: new Date(),
    });

    const result = {
      id: uuid(),
      user: id,
      title,
      contents,
      createAt: new Date(),
    };

    return result;
  }

  softDelete({ questionId }) {
    const target = this.database.findIndex((item) => item.id === questionId);
    this.database.splice(target, 1);
    return target ? { affected: true } : { affected: false };
  }

  extractNumberFromDate(date: Date): number {
    return Number(date.toISOString().replace(/\D/g, ""));
  }
}

ObjectType();
export class MockUser {
  id: string;
  nickname: string;
  email: string;
  password: string;
  provider: string;
  age: number;
  interest: string;
  reported: number;
  image: null | string;
  createAt: Date;
  updateAt: Date;
  deleteAt: Date;
}

export class MockUserRepository {
  database = [
    {
      id: "user1",
      nickname: "nickname1",
      email: "email@email.com1",
      password: "password",
      provider: "credentials",
      age: 30,
      interest: "null",
      reported: 0,
      image: null,
      createAt: new Date(),
      updateAt: new Date(),
      deleteAt: new Date(),
    },
  ];

  findOneByIdWithInterests({ id }: IUsersServiceFindOneById): MockUser {
    const result = this.database.find((user) => user.id === id);
    return result;
  }
  findOne({ id }) {
    const result = this.database.find((user) => user.id === id);

    return result;
  }

  update({ id, updateUserInput }: IUsersServiceUpdate): MockUser {
    const user = this.findOneByIdWithInterests({ id });

    const result = { ...user, ...updateUserInput };
    return result;
  }
}

export class MockInterestRepository {
  database = [
    {
      id: "1",
      name: "축구",
    },
  ];
}
