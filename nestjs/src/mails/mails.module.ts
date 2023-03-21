import { MailerModule } from "@nest-modules/mailer";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";
import { MailResolver } from "./mails.resolver";
import { MailService } from "./mails.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User, //
    ]),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          service: process.env.MAIL_SERVICE,
          auth: {
            user: process.env.MAIL_AUTH_USER,
            pass: process.env.MAIL_AUTH_PASSWORD,
          },
        },
      }),
    }),
  ],
  providers: [
    MailResolver, //
    MailService, //
    UsersService,
  ],
})
export class MailModule {}
