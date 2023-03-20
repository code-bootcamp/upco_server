import { Field, Int, ObjectType } from "@nestjs/graphql";
import { User } from "src/users/entities/user.entity";

@ObjectType()
export class FindAroundUserOutput {
  @Field(() => String)
  id: string;
  @Field(() => String)
  nickname: string;

  @Field(() => String)
  email: string;

  password: string;

  @Field(() => String)
  provider: string;

  @Field(() => Int)
  age: number;

  @Field(() => String)
  interest: string;

  @Field(() => Int)
  reported: number;

  @Field(() => String)
  image: string;

  @Field(() => String)
  lat: string;

  @Field(() => String)
  lng: string;

  //

  createAt: string;
  deleteAt: string;
}
