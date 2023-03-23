import { PROVIDER_ENUM } from "src/common/interfaces/provider";
import { CreateFriendInput } from "../dto/create-friend.input";
import { CreateUserInput } from "../dto/create-user.dto";
import { UpdateAllInput } from "../dto/update-all.input";
import { UpdateUserPwdInput } from "../dto/update-user.input";

export interface IUsersServiceCreate {
  createUserInput: CreateUserInput;
}

export interface IUserServiceCreateOauthUser {
  id: string;
  nickname: string;
  provider: PROVIDER_ENUM;
}

export interface IUsersServiceUpdateInput {
  id: string;
  updateUserPwdInput: UpdateUserPwdInput;
}

export interface IUsersServiceUpdateAllInput {
  id: string;
  updateAllInput: UpdateAllInput;
}

export interface IUsersServiceFindOneById {
  id: string;
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

export interface IUsersServiceDelete {
  id: string;
}
