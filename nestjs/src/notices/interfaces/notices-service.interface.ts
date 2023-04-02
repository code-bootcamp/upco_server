import { CreateNoticeInput } from "../dto/create-notice.input";

export interface INoticesServiceCreate {
  createNoticeInput: CreateNoticeInput;
}

export interface INoticesServiceFindOne {
  id: string;
}
