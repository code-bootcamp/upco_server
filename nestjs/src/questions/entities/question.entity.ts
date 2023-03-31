import { Field, ObjectType } from "@nestjs/graphql";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
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

  @Column({ type: "varchar", length: 50 })
  @Field(() => String)
  title: string;

  @Column({ type: "varchar", length: 2000 })
  @Field(() => String)
  contents: string;

  // ------

  @CreateDateColumn()
  @Field(() => Date)
  createAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;
}
