import { PROVIDER_ENUM } from "src/common/interfaces/provider";
import { CreateUserInput } from "../dto/create-user.dto";
import { UpdateUserInput } from "../dto/update-user.dto";

export interface IUsersServiceCreate {
  createUserInput: CreateUserInput;
}

export interface IUserServiceCreateOauthUser {
  id: string;
  nickname: string;
  provider: PROVIDER_ENUM;
}

export interface IUsersServiceUpdate {
  id: string;
  updateUserInput: UpdateUserInput;
}

export interface IUsersServiceFindOneById {
  id: string;
}

export interface IUsersServiceFindOneByEmail {
  email: string;
}

export interface IUsersServiceGetHashedPwd {
  password: string;
}

export interface IUsersServiceFindLogin {
  userId: string;
}

export interface IUsersServiceDelete {
  id: string;
}
