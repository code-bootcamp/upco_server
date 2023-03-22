import { CacheModule, Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { JwtAccessStrategy } from "./auth/strategies/jwt-access.strategy";
import { JwtRefreshStrategy } from "./auth/strategies/jwt-refresh.strategy";
import { RedisClientOptions } from "redis";
import * as redisStore from "cache-manager-redis-store";
import { MapModule } from "./maps/maps.module";
import { BlockUserModule } from "./blockUsers/blockUsers.module";
import { MailModule } from "./mails/mails.module";
import { QuestionModule } from "./questions/questions.module";
import { FriendsModule } from "./friends/friends.module";

@Module({
  imports: [
    AuthModule,
    BlockUserModule,
    FriendsModule,
    MailModule,
    MapModule,
    UsersModule,
    QuestionModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: () => ({
        autoSchemaFile: true,
        context: ({ req, res }) => ({ req, res }),
        cors: {
          origin: process.env.ORIGIN,
          credentials: true,
        },
      }),
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.TYPEORM_HOST,
      port: Number(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [__dirname + "/**/*.entity.*"],
      synchronize: true,
      logging: true,
      timezone: process.env.TZ,
    }),
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      url: process.env.REDIS_CONNECTION,
      isGlobal: true,
    }),
  ],
  providers: [
    JwtAccessStrategy, //
    JwtRefreshStrategy,
  ],
})
export class AppModule {}
