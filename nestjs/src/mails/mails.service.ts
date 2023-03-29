import { MailerService } from "@nest-modules/mailer";
import { Injectable, NotAcceptableException } from "@nestjs/common";
import { IUsersServiceUpdate } from "src/users/interfaces/user-service.interface";
import { UsersService } from "src/users/users.service";
import { IMailServicePasswordResetMailer } from "./interfaces/mail-service.interface";

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService, //
    private readonly userService: UsersService, //
  ) {}

  renderNewPassword(): string {
    return String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
  }

  async passwordResetMailer({
    email,
  }: IMailServicePasswordResetMailer): Promise<string> {
    const user = this.userService.findOneByEmail({ email });
    if (!user) throw new NotAcceptableException();

    // 임시 비밀번호 생성 로직 및 업데이트 로직입니다.
    const renderNewPassword = this.renderNewPassword();

    const input: IUsersServiceUpdate = {
      id: (await user).id,
      updateUserInput: {
        password: renderNewPassword,
      },
    };

    await this.userService.update(input);

    // 메일 전송 로직입니다.
    try {
      await this.mailerService.sendMail({
        to: email,
        from: process.env.MAIL_AUTH_USER,
        subject: "[upco] : 임시비밀번호를 안내드립니다.",
        html: `회원님의 임시 비밀번호는 ${renderNewPassword}입니다.`,
      });
    } catch (error) {
      console.log(error);
      throw new NotAcceptableException();
    }
    return "전송 완료";
  }
}
