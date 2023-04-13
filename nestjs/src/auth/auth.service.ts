import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  UnprocessableEntityException,
} from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import {
  IAuthServiceGetAccessToken,
  IAuthServiceGetRestoreToken,
  IAuthServiceLogin,
  IAuthServiceLogout,
  IAuthServiceSetRefreshToken,
  IAuthSocialLogin,
} from "./interfaces/auth-service.interface";

import { JwtService } from "@nestjs/jwt";

import * as bcrypt from "bcrypt";
import getRandomNickName from "src/common/util/getRandomNickname";
import { Cache } from "cache-manager";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService, //

    private readonly usersService: UsersService,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async login({ email, password, res }: IAuthServiceLogin): Promise<string> {
    const user = await this.usersService.findOneByEmail({ email });
    if (!user) throw new UnprocessableEntityException("");

    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) throw new UnprocessableEntityException("");

    this.setRefreshToken({ user, res });

    return this.getAccessToken({ user });
  }

  async socialLogin({ req, res, provider }: IAuthSocialLogin) {
    let user = await this.usersService.findOneByEmail({
      email: req.user.id,
    });
    if (!user)
      user = await this.usersService.createOauthUser({
        id: req.user.id,
        nickname: getRandomNickName(),
        provider,
      });
    this.setRefreshToken({ user, res });
    res.redirect(process.env.ORIGIN + "/main");
  }

  async logout({ req }: IAuthServiceLogout): Promise<string> {
    const refreshToken = req.headers.cookie.replace("refreshToken=", "");
    const accessToken = req.headers.authorization.replace("Bearer ", "");

    try {
      this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_KEY,
      });
      this.jwtService.verify(accessToken, {
        secret: process.env.JWT_ACCESS_KEY,
      });
    } catch (error) {
      throw new UnprocessableEntityException("");
    }

    await Promise.all([
      this.cacheManager.set(`refreshToken=${refreshToken}`, "refresh", {
        ttl: 604800,
      }),
      this.cacheManager.set(`accessToken=${accessToken}`, "access", {
        ttl: 3600,
      }),
    ]);
    return "로그아웃에 성공했습니다";
  }

  setRefreshToken({ user, res }: IAuthServiceSetRefreshToken): void {
    const refreshToken = this.jwtService.sign(
      { sub: { email: user.email, id: user.id } },
      { secret: process.env.JWT_REFRESH_KEY, expiresIn: "2w" },
    );

    res.setHeader(
      "Set-Cookie",
      `refreshToken=${refreshToken}; path=/; domain=.api.upco.space; SameSite=None;`,
    );
    res.setHeader("Access-Control-Allow-Origin", process.env.ORIGIN);
    res.setHeader("Access-Control-Allow-Credentials", "true");

    // res.setHeader(
    //   "Set-Cookie",
    //   `refreshToken=${refreshToken}; path=/; domain=.api.upco.space; SameSite=None; Secure; httpOnly`,
    // );
    // res.setHeader("Access-Control-Allow-Origin", process.env.ORIGIN);
    // res.setHeader("Access-Control-Allow-Credentials", "true");
  }

  getAccessToken({ user }: IAuthServiceGetAccessToken): string {
    return this.jwtService.sign(
      { sub: { email: user.email, id: user.id } },
      { secret: process.env.JWT_ACCESS_KEY, expiresIn: "1h" },
    );
  }

  restoreAccessToken({ user }: IAuthServiceGetRestoreToken): string {
    return this.getAccessToken({ user });
  }
}
