import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import {
  IAuthServiceGetAccessToken,
  IAuthServiceGetRestoreToken,
  IAuthServiceLogin,
  IAuthServiceSetRefreshToken,
} from "./interfaces/auth-service.interface";

import { JwtService } from "@nestjs/jwt";

import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService, //

    private readonly usersService: UsersService,
  ) {}

  async login({ email, password, res }: IAuthServiceLogin): Promise<string> {
    const user = await this.usersService.findOneByEmail({ email });
    if (!user) throw new UnprocessableEntityException("이메일이 없습니다.");

    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth)
      throw new UnprocessableEntityException("비밀번호가 틀렸습니다.");

    this.setRefreshToken({ user, res });

    return this.getAccessToken({ user });
  }

  setRefreshToken({ user, res }: IAuthServiceSetRefreshToken): void {
    const refreshToken = this.jwtService.sign(
      { sub: { email: user.email, id: user.id } },
      { secret: process.env.JWT_REFRESH_KEY, expiresIn: "2w" },
    );

    res.setHeader(
      "Set-Cookie",
      `refreshToken=${refreshToken}; path=/; domain=.api.upco.space; SameSite=None; Secure; httpOnly`,
    );
    res.setHeader("Access-Control-Allow-Origin", process.env.ORIGIN);
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }

  getAccessToken({ user }: IAuthServiceGetAccessToken): string {
    return this.jwtService.sign(
      { sub: { email: user.email, id: user.id } },
      { secret: process.env.JWT_ACCESS_KEY, expiresIn: "10s" },
    );
  }

  restoreAccessToken({ user }: IAuthServiceGetRestoreToken): string {
    return this.getAccessToken({ user });
  }
}
