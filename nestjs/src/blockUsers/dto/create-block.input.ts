import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateBlockUserInput {
  @Field(() => String)
  blockUser_id: string;
}
