import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class UpdateUserInput {
  @Field(() => String, { nullable: true })
  nickname?: string;

  @Field(() => Int, { nullable: true })
  age?: number;

  @Field(() => [String], { nullable: true })
  interests?: string[];

  @Field(() => String, { nullable: true })
  image?: string;
}
