import { Field, Float, InputType } from "@nestjs/graphql";

@InputType()
export class SaveUserLocationInput {
  @Field(() => Float)
  lat: number;

  @Field(() => Float)
  lng: number;
}
