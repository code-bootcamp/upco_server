import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/users/entities/user.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
@ObjectType()
export class Friend {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  friend_id: string;

  @JoinColumn()
  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @Column()
  @Field(() => Boolean)
  success: boolean;
}
