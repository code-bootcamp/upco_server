import { CreateInterestInput } from "../dto/create-interest.dto.input";

export interface IInterestServiceCreate {
  createInterestInput: CreateInterestInput;
}

export interface IInterestServiceFindOneByInterest {
  interestId: string;
}
