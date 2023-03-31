import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Friend {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => String)
  id: string;

  @ManyToOne(() => User)
  @Field(() => User)
  sender: User;

  @ManyToOne(() => User)
  @Field(() => User)
  receiver: User;

  @Column({ default: false })
  @Field(() => Boolean)
  status: boolean;
}
