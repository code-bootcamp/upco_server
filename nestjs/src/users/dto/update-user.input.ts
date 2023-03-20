import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateUserPwdInput {
  @Field(() => String)
  password: string;
}
