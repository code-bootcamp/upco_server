import { MailerModule } from "@nest-modules/mailer";
import { Module } from "@nestjs/common";
import { MailResolver } from "./mails.resolver";
import { MailService } from "./mails.service";

@Module({
  imports: [
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
  ],
})
export class MailModule {}
