import { CACHE_MANAGER, Inject, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Cache } from "cache-manager";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";

export class JwtAccessStrategy extends PassportStrategy(Strategy, "access") {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ACCESS_KEY,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload) {
    const accessToken = req.headers.authorization.replace("Bearer ", "");
    const cachedAccessToken = await this.cacheManager.get(
      `accessToken=${accessToken}`,
    );

    if (!cachedAccessToken) {
      throw new UnauthorizedException("로그아웃한 토큰입니다.");
    }

    return {
      id: payload.sub.id,
      email: payload.sub.email,
    };
  }
}
