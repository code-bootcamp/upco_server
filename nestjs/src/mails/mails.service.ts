import { MailerService } from "@nest-modules/mailer";
import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService, //
  ) {}

  async passwordResetMailer({ email }): Promise<string> {
    try {
      await this.mailerService.sendMail({
        to: email,
        from: process.env.MAIL_AUTH_USER,
        subject: "test입니다.",
        html: `비밀번호는 ㅇㅇㅇㅇ입니다.`,
      });
      return "전송 완료";
    } catch (error) {
      console.log(error);
      return "전송 실패";
    }
  }
}
