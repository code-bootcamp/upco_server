import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { Cache } from "cache-manager";
import { Redis, RedisOptions } from "ioredis";

@Injectable()
export class MapService {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  // GEO-API
  async findLocation({ findAroundUsersInput }) {
    const { lat1, lng1, lat2, lng2 } = findAroundUsersInput;

    const redisInfo: RedisOptions = {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      db: Number(process.env.REDIS_DB),
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

    const result = await client.georadius(
      "geoSet",
      centerLng,
      centerLat,
      radius,
      "km",
      "withCoord",
    );
    console.log(result);
    return result;
  }

  getCenterLocation({ lat1, lng1, lat2, lng2 }) {
    const centerLng = (lng1 + lng2) / 2;
    const centerLat = (lat1 + lat2) / 2;
    return [centerLng, centerLat];
  }

  // 두 좌표 사이의 거리를 구하는 로직입니다.
  getDistanceFromLatLonInKm({ lat1, lng1, lat2, lng2 }) {
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

  async saveLocation({ email, location }): Promise<string> {
    console.log(email, location);
    const { lat, lng } = location;

    const redisInfo: RedisOptions = {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      db: Number(process.env.REDIS_DB),
    };

    // userDB 에 접근하여 아이딧값을 가져오는 로직을 사용할 예정입니다.

    const client = new Redis(redisInfo);
    const userId = "tempData";

    try {
      // redis 내 ttlSet 객체 안에 유저 아이디와 ttl을 저장하는 로직입니다.
      const ttl = 30000;
      const value = Date.now() + ttl;
      await client.zadd("ttlSet", value, userId);
      // redis 내 geoSet 객체 안에 유저 아이디와 위치정보를 저장하는 로직입니다.
      client.geoadd("geoSet", lng, lat, userId);
    } catch (error) {
      console.log(error);
      return;
    }

    return `${userId}의 위치정보가 정상적으로 저장되었습니다.`;
  }
}
