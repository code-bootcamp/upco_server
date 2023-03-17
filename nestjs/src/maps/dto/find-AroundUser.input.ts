import { Field, Float, InputType } from "@nestjs/graphql";

@InputType()
export class FindAroundUserInput {
  @Field(() => Float)
  lat1: number;

  @Field(() => Float)
  lng1: number;

  @Field(() => Float)
  lat2: number;

  @Field(() => Float)
  lng2: number;
}
