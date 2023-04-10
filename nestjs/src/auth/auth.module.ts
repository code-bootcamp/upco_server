import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { UsersModule } from "src/users/users.module";
import { AuthController } from "./auth.controller";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";
import { JwtAccessStrategy } from "./strategies/jwt-access.strategy";
import { JwtRefreshStrategy } from "./strategies/jwt-refresh.strategy";
import { JwtGoogleStrategy } from "./strategies/jwt-social-google-strategy";
import { JwtKakaoStrategy } from "./strategies/jwt-social-kakao-strategy";

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([
      User, //
    ]),
    UsersModule,
  ],
  providers: [
    JwtService,
    JwtAccessStrategy,
    JwtRefreshStrategy,
    JwtGoogleStrategy,
    JwtKakaoStrategy,
    AuthResolver,
    AuthService,
  ],
  controllers: [
    AuthController, //
  ],
})
export class AuthModule {}
