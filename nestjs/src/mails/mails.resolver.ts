import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { PublicAccess } from "src/common/decorator/public-access";
import { MailService } from "./mails.service";

@Resolver()
export class MailResolver {
  constructor(
    private readonly mailService: MailService, //
  ) {}

  @PublicAccess()
  @Mutation(() => String)
  passwordResetMailer(
    @Args("email") email: string, //
  ): Promise<string> {
    return this.mailService.passwordResetMailer({ email });
  }

  @PublicAccess()
  @Mutation(() => String)
  sendMailForVerification(
    @Args("email") email: string, //
  ): Promise<string> {
    return this.mailService.verify({ email });
  }
}
