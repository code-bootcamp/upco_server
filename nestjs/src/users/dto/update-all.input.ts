import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class UpdateAllInput {
  @Field(() => String)
  nickname: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => Int)
  age: number;

  @Field(() => String)
  interest: string;

  @Field(() => String)
  image: string;
}
