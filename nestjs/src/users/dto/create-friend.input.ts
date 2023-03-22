import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateFriendInput {
  @Field(() => String)
  id: string;

  @Field(() => String)
  email: string;
}
