import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/users/entities/user.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class banUser {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => String)
  banUser_id: string;

  @JoinColumn()
  @ManyToOne(() => User)
  @Field(() => User)
  user: User;
}
