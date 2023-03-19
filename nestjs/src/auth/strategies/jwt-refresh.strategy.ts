import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";

export class JwtRefreshStrategy extends PassportStrategy(Strategy, "refresh") {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        const cookie = req.headers.cookie;
        const refreshToken = cookie.replace("refreshToken=", "");
        return refreshToken;
      },
      secretOrKey: process.env.JWT_REFRESH_KEY,
    });
  }

  async validate(payload) {
    return {
      id: payload.sub.id,
      email: payload.sub.email,
    };
  }
}
