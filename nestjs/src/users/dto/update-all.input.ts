import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateAllInput {
  @Field(() => String)
  interest: string;

  @Field(() => String)
  image: string;
}
