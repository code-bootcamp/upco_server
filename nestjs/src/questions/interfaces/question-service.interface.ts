import { StringArraySupportOption } from "prettier";
import { CreateQuestionInput } from "../dto/create-question.input";

export interface ICreateQuestionServiceInput {
  id: string;
  createQuestionInput: CreateQuestionInput;
}

export interface IFetchQuestionInput {
  id: string;
  questionId: string;
}
export interface IFetchQuestionsInput {
  id: string;
}
