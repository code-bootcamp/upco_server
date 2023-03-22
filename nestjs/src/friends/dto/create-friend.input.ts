import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateFriendInput {
  @Field(() => String)
  opponentId: string;
}
