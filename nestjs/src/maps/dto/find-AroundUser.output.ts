import { Field, Int, ObjectType } from "@nestjs/graphql";
import { User } from "src/users/entities/user.entity";

@ObjectType()
export class FindAroundUserOutput extends User {
  @Field(() => String)
  lat: string;

  @Field(() => String)
  lng: string;
}
