import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class UpdateAllInput {
  @Field(() => Int)
  age: number;

  @Field(() => String)
  interest: string;

  @Field(() => String)
  image: string;
}
