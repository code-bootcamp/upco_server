import { CreateQuestionInput } from "../dto/create-question.input";

export interface ICreateQuestionServiceInput {
  id: string;
  createQuestionInput: CreateQuestionInput;
}

export interface IFetchQuestionsInput {
  id: string;
}
