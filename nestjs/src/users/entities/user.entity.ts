import { Field, Int, ObjectType } from "@nestjs/graphql";
import { PROVIDER_ENUM } from "src/common/interfaces/provider";
import { Interest } from "src/interests/entities/interest.entity";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
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

  @Column({ type: "enum", enum: PROVIDER_ENUM, default: "credentials" })
  @Field(() => String)
  provider: string;

  @Column({ nullable: true })
  @Field(() => Int, { nullable: true })
  age?: number;

  @JoinTable()
  @ManyToMany(() => Interest, (interests) => interests.user)
  @Field(() => [Interest], { nullable: true })
  interests?: Interest[];

  @Column({ default: 0 })
  @Field(() => Int, { nullable: true })
  reported: number;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  image?: string;

  // =====================

  @CreateDateColumn()
  @Field(() => Date, { nullable: true })
  createAt?: Date;

  @UpdateDateColumn()
  @Field(() => Date, { nullable: true })
  updateAt?: Date;

  @DeleteDateColumn()
  //@Field(() => Date, { nullable: true })
  deleteAt?: Date;
}
