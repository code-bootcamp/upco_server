import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth2";

export class JwtGoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://api.upco.space/login/google",
      scope: ["email", "profile"],
    });
  }

  validate(_, __, profile) {
    return {
      id: profile.id,
    };
  }
}
