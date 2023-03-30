import { InputType, OmitType, PartialType } from "@nestjs/graphql";
import { User } from "../entities/user.entity";

@InputType()
export class UpdateUserInput extends PartialType(
  OmitType(User, [
    "id",
    "createAt",
    "deleteAt",
    "updateAt",
    "provider",
    "email",
    "reported",
  ]),
  InputType,
) {}
