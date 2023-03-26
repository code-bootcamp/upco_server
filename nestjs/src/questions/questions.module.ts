import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "src/users/users.module";
import { Question } from "./entities/question.entity";
import { QuestionResolver } from "./questions.resolver";
import { QuestionService } from "./questions.service";

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([
      Question, //
    ]),
  ],
  providers: [
    QuestionResolver, //
    QuestionService, //
  ],
})
export class QuestionModule {}
