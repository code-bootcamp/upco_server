import { Request, Response } from "express";
import { IAuthUser } from "src/common/interfaces/context";
import { IOauthUser } from "src/common/interfaces/oauthuser";
import { PROVIDER_ENUM } from "src/common/interfaces/provider";
import { User } from "src/users/entities/user.entity";

export interface IAuthServiceLogin {
  email: string;
  password: string;
  res: Response;
}

export interface IAuthServiceLogout {
  req: Request;
}

export interface IAuthServiceGetAccessToken {
  user: User | IAuthUser["user"];
}

export interface IAuthServiceSetRefreshToken {
  user: User;
  res: Response;
}

export interface IAuthServiceGetRestoreToken {
  user: User | IAuthUser["user"];
}

export interface IAuthSocialLogin {
  req: Request & IOauthUser;
  res: Response;
  provider: PROVIDER_ENUM;
}
