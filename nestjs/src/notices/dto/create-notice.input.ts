import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateNoticeInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  contents: string;
}
