import { CreateQuestionInput } from "../dto/create-question.input";

export interface IQuestionServiceCreateQuestion {
  id: string;
  createQuestionInput: CreateQuestionInput;
}

export interface IQuestionServiceFetchQuestion {
  id: string;
  questionId: string;
}
export interface IQuestionServiceFetchQuestions {
  id: string;
}

export interface IQuestionServiceDeleteQuestion {
  id: string;
  questionId: string;
}
