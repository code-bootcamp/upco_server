import { Field, InputType } from "@nestjs/graphql";
import { User } from "src/users/entities/user.entity";

@InputType()
export class CreateFriendInput {
  @Field(() => User)
  opponentId?: User;

  @Field(() => User)
  userId?: User;

  @Field(() => Boolean)
  isSuccess?: boolean;
}
