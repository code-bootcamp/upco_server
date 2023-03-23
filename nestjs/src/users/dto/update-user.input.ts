import { Field, InputType, OmitType, PartialType } from "@nestjs/graphql";
import { User } from "../entities/user.entity";

@InputType()
export class UpdateUserInput extends PartialType(
  OmitType(User, [
    "id",
    "createAt",
    "deletedAt",
    "updateAt",
    "provider",
    "email",
  ]),
  InputType,
) {
  @Field()
  password?: string;
}
