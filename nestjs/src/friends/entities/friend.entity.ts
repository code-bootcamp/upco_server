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
export class friend {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => String)
  friend_id: string;

  @JoinColumn()
  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @Column()
  @Field(() => Boolean)
  success: boolean;

  @Column()
  @Field(() => String)
  friend_requests: string;
}
