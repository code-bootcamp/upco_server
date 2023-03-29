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
export class BlockUser {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => String, { nullable: true })
  id?: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  blockUserId?: string;

  @JoinColumn()
  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @Column({ default: false })
  @Field(() => String)
  reportedId: string;
}
