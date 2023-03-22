import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";
import { Question } from "./entities/question.entity";
import { QuestionResolver } from "./questions.resolver";
import { QuestionService } from "./questions.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User, //
      Question, //
    ]),
  ],
  providers: [
    UsersService, //
    QuestionResolver, //
    QuestionService, //
  ],
})
export class QuestionModule {}
