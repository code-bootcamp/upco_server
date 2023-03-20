import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateReportInput {
  @Field(() => String)
  blockUser_id: string;

  @Field(() => String)
  report_id: string;
}
