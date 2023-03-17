import { CreateUserInput } from "../dto/create-user.dto";

export interface IUsersServiceCreate {
  createUserInput: CreateUserInput;
}

export interface IUsersServiceFindOneByEmail {
  email: string;
}

export interface IUsersServiceFindOneByHash {
  password: string;
}

export interface IUsersServiceFindLogin {
  userId: string;
}
