import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateReportInput {
  @Field(() => String)
  reportId: string;
}
