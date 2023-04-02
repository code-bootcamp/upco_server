import { Field, ObjectType } from "@nestjs/graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
@ObjectType()
export class Notice {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => String)
  id: string;

  @Column({ type: "varchar", length: 50 })
  @Field(() => String)
  title: string;

  @Column({ type: "varchar", length: 2000 })
  @Field(() => String)
  contents: string;

  @CreateDateColumn()
  @Field(() => Date)
  createAt: Date;
}
