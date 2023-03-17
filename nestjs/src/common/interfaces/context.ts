import { Request, Response } from "express";

export interface IAuthUser {
  user?: {
    userId: string;
  };
}

// 유저 정보를 가져와 DB 조회하는 로직
export interface IContext {
  req: Request & IAuthUser;
  res: Response;
}
