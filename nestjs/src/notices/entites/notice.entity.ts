import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Notice {
  @PrimaryGeneratedColumn("increment")
  @Field(() => Int)
  number: number;

  @Column({ type: "varchar", length: 50 })
  @Field(() => String)
  title: string;

  @Column({ type: "varchar", length: 2000 })
  @Field(() => String)
  contents: string;
}
