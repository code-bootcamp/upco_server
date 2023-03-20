import { Field, Int, ObjectType } from "@nestjs/graphql";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => String)
  id: string;

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
  @Field(() => String)
  provider: string;

  @Column({ nullable: true })
  @Field(() => Int)
  age: number;

  @Column({ nullable: true })
  @Field(() => String)
  interest: string;

  @ManyToMany(() => User)
  @Field(() => [User])
  friends: User[];

  @ManyToMany(() => User)
  @Field(() => [User])
  friend_requests: User[];

  @ManyToMany(() => User)
  @Field(() => [User])
  banUser: User[];

  @Column({ nullable: true })
  @Field(() => Int)
  reported: number;

  @Column({ nullable: true })
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
