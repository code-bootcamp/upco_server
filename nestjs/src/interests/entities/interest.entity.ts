import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/users/entities/user.entity";

import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("interests")
@ObjectType("Interest")
export class Interest {
  @PrimaryGeneratedColumn()
  @Field(() => String)
  id: string;

  @Column({ unique: true })
  @Field(() => String)
  name: string;

  @ManyToMany(() => User, (users) => users.interests)
  @Field(() => [User], { nullable: true })
  user?: User[];
}
