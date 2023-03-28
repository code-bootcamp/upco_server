import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Interest {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String, { nullable: true })
  name?: string;

  @ManyToMany(() => User, (users) => users.interests)
  @Field(() => [User])
  users: User[];
}
