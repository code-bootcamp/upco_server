import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class UpdateUserBulkInsertInput {
  @Field(() => String, { nullable: true })
  nickname?: string;

  @Field(() => String, { nullable: true })
  password?: string;

  @Field(() => Int, { nullable: true })
  age?: number;

  @Field(() => String, { nullable: true })
  image?: string;

  @Field(() => [String], { nullable: true })
  interests?: string[];
}
