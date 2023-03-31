import { MailerService } from "@nest-modules/mailer";
import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  NotAcceptableException,
} from "@nestjs/common";
import { Cache } from "cache-manager";
import { IEmailsService } from "./interfaces/mail-service.interface";

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService, //
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  // renderNewPassword(): string {
  //   return String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
  // }

  // async passwordResetMailer({ email }: IEmailsService): Promise<string> {
  //   const user = this.userService.findOneByEmail({ email });
  //   if (!user) throw new NotAcceptableException();

  //   // 임시 비밀번호 생성 로직 및 업데이트 로직입니다.
  //   const renderNewPassword = this.renderNewPassword();

  //   const input = {
  //     id: (await user).id,
  //     updateUserInput: {
  //       password: renderNewPassword,
  //     },
  //   };

  //   await this.userService.update(input);

  //   // 메일 전송 로직입니다.
  //   try {
  //     await this.mailerService.sendMail({
  //       to: email,
  //       from: process.env.MAIL_AUTH_USER,
  //       subject: "[upco] : 임시비밀번호를 안내드립니다.",
  //       html: `회원님의 임시 비밀번호는 ${renderNewPassword}입니다.`,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     throw new NotAcceptableException();
  //   }
  //   return "전송 완료";
  // }

  async verify({ email }: IEmailsService) {
    const randomToken = String(Math.floor(Math.random() * 1000000)).padStart(
      6,
      "0",
    );

    await this.cacheManager.set(email, randomToken, { ttl: 3600 });

    try {
      await this.mailerService.sendMail({
        to: email,
        from: process.env.MAIL_AUTH_USER,
        subject: "[upco] : 인증 코드입니다..",
        html: `회원님의 메일 인증 코드는 ${randomToken}입니다. 인증 코드는 한 시간 동안 유효합니다.`,
      });
    } catch (error) {
      console.log(error);
      throw new NotAcceptableException();
    }

    return "전송 완료";
  }
}
