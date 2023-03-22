import { Field, ObjectType } from "@nestjs/graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "src/users/entities/user.entity";

@Entity()
@ObjectType()
export class Question {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => String)
  id: string;

  @JoinColumn()
  @ManyToOne(() => User)
  // @Field(() => User)
  user: User;

  @Column()
  @Field(() => String)
  title: string;

  @Column()
  @Field(() => String)
  contents: string;

  // ------

  @CreateDateColumn()
  @Field(() => Date)
  createAt: Date;
}
