import { Field, Int, ObjectType } from "@nestjs/graphql";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => String)
  userId: string;

  @Column()
  @Field(() => String)
  nickname: string;

  @Column()
  @Field(() => String)
  email: string;

  @Column()
  // @Field(() => String)
  password: string;

  @Column()
  @Field(() => Int)
  age: number;

  @Column()
  @Field(() => [String])
  interest: string[];

  @Column()
  @Field(() => [String])
  follower: string[];

  @Column()
  @Field(() => [String])
  banUser: string[];

  @Column()
  @Field(() => Int)
  reported: number;

  @Column()
  @Field(() => String)
  image: string;

  // =====================

  @CreateDateColumn()
  @Field(() => Date)
  createAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updateAt: Date;

  @DeleteDateColumn()
  @Field(() => Date)
  deletedAt: Date;
}
