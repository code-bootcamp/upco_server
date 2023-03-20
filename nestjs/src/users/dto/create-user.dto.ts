import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class CreateUserInput {
  @Field(() => String)
  nickname: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => Int)
  age: number;
}
