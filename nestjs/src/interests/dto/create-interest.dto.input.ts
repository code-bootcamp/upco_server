import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateInterestInput {
  @Field(() => String)
  name: string;
}
