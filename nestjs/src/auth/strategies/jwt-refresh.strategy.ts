import { CACHE_MANAGER, Inject, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Cache } from "cache-manager";
import { Request } from "express";
import { Strategy } from "passport-jwt";

export class JwtRefreshStrategy extends PassportStrategy(Strategy, "refresh") {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {
    super({
      jwtFromRequest: (req) => {
        const cookie = req.headers.cookie;
        const refreshToken = cookie.replace("refreshToken=", "");
        return refreshToken;
      },
      secretOrKey: process.env.JWT_REFRESH_KEY,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload) {
    const refreshToken = req.headers.cookie.replace("refreshToken=", "");
    const cachedRefreshToken = await this.cacheManager.get(
      `refreshToken=${refreshToken}`,
    );

    if (!cachedRefreshToken) {
      throw new UnauthorizedException("로그아웃한 토큰입니다.");
    }

    return {
      id: payload.sub.id,
      email: payload.sub.email,
    };
  }
}
