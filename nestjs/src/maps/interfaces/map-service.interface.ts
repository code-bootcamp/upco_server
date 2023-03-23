import { ObjectType } from "@nestjs/graphql";
import { IContext } from "src/common/interfaces/context";
import { User } from "src/users/entities/user.entity";
import { FindAroundUserInput } from "../dto/find-AroundUser.input";
import { FindAroundUserOutput } from "../dto/find-AroundUser.output";

export interface IBothLocation {
  lat1: number;
  lng1: number;
  lat2: number;
  lng2: number;
}
export interface IFindAroundUsersInput {
  findAroundUsersInput: FindAroundUserInput;
}

export interface IFindAroundUsersOutput {
  findAroundUsersOutput: FindAroundUserOutput;
}
export interface IGetUsersInfo {
  userIds: string[];
  locationByUsers: IlocationByUser;
}
export interface ISaveLocation {
  context: IContext;
  location: ILocation;
}
export interface IlocationByUser {
  [location: number]: string[];
}
export interface IUserWithLocation extends User {
  lat: string;
  lng: string;
}

export interface ILocation {
  lat: number;
  lng: number;
}
