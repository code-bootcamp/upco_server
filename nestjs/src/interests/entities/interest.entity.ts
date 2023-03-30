import { Field, InputType, ObjectType } from "@nestjs/graphql";

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("interests")
@ObjectType("Interest")
@InputType("InterestInput")
export class Interest {
  @PrimaryGeneratedColumn("increment")
  @Field(() => String, { nullable: true })
  id: string;

  @Column({ unique: true })
  @Field(() => String)
  name: string;
}
