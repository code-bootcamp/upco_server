import { IAuthUser, IContext } from "src/common/interfaces/context";
import { User } from "src/users/entities/user.entity";

export interface IAuthServiceLogin {
  email: string;
  password: string;
  res: IContext["res"];
}

export interface IAuthServiceGetAccessToken {
  user: User | IAuthUser["user"];
}

export interface IAuthServiceSetRefreshToken {
  user: User;
  res: IContext["res"];
}

export interface IAuthServiceGetRestoreToken {
  user: User | IAuthUser["user"];
}

export interface IOAuthUser {
  user: {
    nickname: string;
    email: string;
    password: string;
  };
}
