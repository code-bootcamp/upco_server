import { Injectable, NotAcceptableException } from "@nestjs/common";
import { Redis, RedisOptions } from "ioredis";
import { UsersService } from "src/users/users.service";
import { IlocationByUser } from "./interfaces/map-service.interface";

@Injectable()
export class MapService {
  constructor(
    private readonly userService: UsersService, //
  ) {}

  deg2rad(deg): number {
    return deg * (Math.PI / 180);
  }

  // GEO-API
  async findLocation({ findAroundUsersInput }) {
    const { lat1, lng1, lat2, lng2 } = findAroundUsersInput;

    this.isValidLocation(lat1, lng1);
    this.isValidLocation(lat2, lng2);
    // 위도경도 조건 불만족 시 반환
    if (lat1 > lat2 || lng1 > lng2) {
      throw new NotAcceptableException();
    }

    const redisInfo: RedisOptions = {
      host: process.env.MAP_REDIS_HOST,
      port: Number(process.env.MAP_REDIS_PORT),
      db: Number(process.env.MAP_REDIS_DB),
    };

    // 주변 user들을 찾기 전, ttl 이 만료된 유저들을 필터링하는 로직입니다.
    const client = new Redis(redisInfo);
    const now = Date.now();
    const members = await client.zrangebyscore("ttlSet", "-inf", now);
    const multi = client.multi();
    members.forEach((member) => {
      multi.del(member);
      multi.zrem("ttlSet", member);
      multi.zrem("geoSet", member);
    });
    await multi.exec();

    const radius = this.getDistanceFromLatLonInKm({ lat1, lng1, lat2, lng2 });
    const centerLocation = this.getCenterLocation({ lat1, lng1, lat2, lng2 });
    const [centerLng, centerLat] = centerLocation;

    const aroundUsers = await client.georadius(
      "geoSet",
      centerLng,
      centerLat,
      radius,
      "km",
      "withCoord",
    );

    const userIds = aroundUsers.map((el) => (el = el[0]));
    const locationByUsers = aroundUsers.map((el) => (el = el[1]));
    locationByUsers.forEach((lat) => (lat[0] = lat[0].slice(0, 10)));
    locationByUsers.forEach((lng) => (lng[1] = lng[1].slice(0, 10)));

    return this.getUsersInfo(userIds, locationByUsers);
  }

  getCenterLocation({ lat1, lng1, lat2, lng2 }) {
    const centerLng = (lng1 + lng2) / 2;
    const centerLat = (lat1 + lat2) / 2;
    return [centerLng, centerLat];
  }

  // DB에 저장된 유저 데이터와 위치정보를 매핑하는 로직입니다.
  async getUsersInfo(userIds: string[], locationByUsers: IlocationByUser) {
    const promises = userIds.map((id) => this.userService.findOneById({ id }));
    const promisedUsers = await Promise.all(promises);
    promisedUsers.forEach(
      (user, idx) => (
        (user["lat"] = locationByUsers[idx][1]),
        (user["lng"] = locationByUsers[idx][0])
      ),
    );
    return promisedUsers;
  }

  // 두 좌표 사이의 거리를 구하는 로직입니다.
  getDistanceFromLatLonInKm({ lat1, lng1, lat2, lng2 }): number {
    const R = 6371;
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d / 2;
  }

  async saveLocation({ context, location }): Promise<string> {
    const id = context.req.user.id;
    const email = context.req.user.email;
    const { lat, lng } = location;

    this.isValidLocation(lat, lng);

    const redisInfo: RedisOptions = {
      host: process.env.MAP_REDIS_HOST,
      port: Number(process.env.MAP_REDIS_PORT),
      db: Number(process.env.MAP_REDIS_DB),
    };

    const client = new Redis(redisInfo);

    try {
      // redis 내 ttlSet 객체 안에 유저 아이디와 ttl을 저장하는 로직입니다.
      const ttl = 300000;
      const value = Date.now() + ttl;
      await client.zadd("ttlSet", value, id);
      // redis 내 geoSet 객체 안에 유저 아이디와 위치정보를 저장하는 로직입니다.
      client.geoadd("geoSet", lng, lat, id);
    } catch (error) {
      console.log(error);
      throw new NotAcceptableException();
    }
    return `${email}의 위치정보가 정상적으로 저장되었습니다.`;
  }

  // 올바른 위도, 경도 값인지 검증하는 로직입니다.
  isValidLocation(lat: number, lng: number): void {
    if (lat < 33 || lat > 39) {
      // 위도값이 올바르지 않을 때 반환되는 오류
      throw new NotAcceptableException();
    }
    if (lng < 125 || lng > 132) {
      // 경도값이 올바르지 않을 때 반환되는 오류
      throw new NotAcceptableException();
    }
  }
}
