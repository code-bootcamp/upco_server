import { IContext } from "src/common/interfaces/context";
import { User } from "src/users/entities/user.entity";
import { FindAroundUserInput } from "../dto/find-AroundUser.input";

export interface IMapServiceFindLocation {
  interest: string | null;
  findAroundUsersInput: FindAroundUserInput;
}

export interface IMapServiceSaveLocation {
  context: IContext;
  location: ILocation;
}
export interface IMapServiceGetUsersInfo {
  interest: string | null;
  userIds: string[];
  locationByUsers: IlocationByUser;
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

export interface IIsValidInterest {
  interest: string | null;
}
export interface IBothLocation {
  lat1: number;
  lng1: number;
  lat2: number;
  lng2: number;
}
