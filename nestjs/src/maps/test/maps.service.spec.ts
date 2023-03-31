import { NotAcceptableException } from "@nestjs/common";
import { ObjectType } from "@nestjs/graphql";
import { Test } from "@nestjs/testing";
import {
  IUsersServiceFindOneById,
  IUsersServiceUpdate,
} from "src/users/interfaces/user-service.interface";
import { UsersResolver } from "src/users/users.resolver";
import { UsersService } from "src/users/users.service";
import { MapService } from "../maps.service";

describe("mapService", () => {
  let mapService: MapService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        MapService, //
        {
          provide: UsersService,
          useValue: {
            findOneById: jest.fn(),
          },
        },
      ],
    }).compile();

    mapService = module.get<MapService>(MapService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("saveUserLocation", () => {
    // isValidLocation
    describe("isValidLocation", () => {
      it("isValidLocation 함수 실행 시 대한민국 내 위도가 아닐 경우 오류반환 해야 함", () => {
        const lat = 40;
        const lng = 128;
        expect(() => mapService.isValidLocation(lat, lng)).toThrow(
          NotAcceptableException,
        );
      });

      it("isValidLocation 함수 실행 시 대한민국 내 경도가 아닐 경우 오류반환 해야 함", () => {
        const lat = 37;
        const lng = 135;
        expect(() => mapService.isValidLocation(lat, lng)).toThrow(
          NotAcceptableException,
        );
      });
    });
    // return
  });

  describe("findAroundUsers", () => {
    // isValidInterest
    describe("isValidInterest", () => {
      it("isValidInterest 함수 실행 시 인자가 string | null 이 아닌 경우 오류를 반환해야 함", () => {
        const interest: any = 123;
        expect(() => mapService.isValidInterest({ interest })).toThrow(
          NotAcceptableException,
        );
      });

      it("isValidInterest 함수 실행 시 인자가 string인 경우 오류를 반환하지 않음", () => {
        const interest = "string";
        expect(() => mapService.isValidInterest({ interest })).not.toThrow();
      });

      it("isValidInterest 함수 실행 시 인자가 null인 경우 오류를 반환하지 않음", () => {
        const interest = null;
        expect(() => mapService.isValidInterest({ interest })).not.toThrow();
      });
    });

    describe("isValidLocationRange", () => {
      // isValidLocationRange
      it("isValidLocationRange 함수 정상실행 시 오류반환하지 않음", () => {
        const lat1 = 10;
        const lat2 = 20;
        const lng1 = 10;
        const lng2 = 20;

        expect(() =>
          mapService.isValidLocationRange({ lat1, lng1, lat2, lng2 }),
        ).not.toThrow(NotAcceptableException);
      });

      it("isValidLocationRange 함수 실행 시 lat1 < lat2 가 아니면 오류반환 해야 함", () => {
        const lat1 = 100;
        const lat2 = 0;
        const lng1 = 10;
        const lng2 = 20;

        expect(() =>
          mapService.isValidLocationRange({ lat1, lng1, lat2, lng2 }),
        ).toThrow(NotAcceptableException);
      });

      it("isValidLocationRange 함수 실행 시 lat2 < lng2 가 아니면 오류반환 해야 함", () => {
        const lat1 = 10;
        const lat2 = 20;
        const lng1 = 100;
        const lng2 = 0;

        expect(() =>
          mapService.isValidLocationRange({ lat1, lng1, lat2, lng2 }),
        ).toThrow(NotAcceptableException);
      });
    });

    // getDisTanceFromLatLonInKm
    describe("getDisTanceFromLatLonInKm", () => {
      it("getDistanceFromLatLonInKm 함수 실행 시 정상적인 데이터가 입력된 경우 가장 긴 반지름을 km로 전환된 값을 반환해야 함", () => {
        const lat1 = 37.488992;
        const lng1 = 126.76352;
        const lat2 = 37.493098;
        const lng2 = 126.766922;
        const result = mapService.getDistanceFromLatLonInKm({
          lat1,
          lng1,
          lat2,
          lng2,
        });
        const expectResult = 0.2731953204472298;
        expect(result).toBeCloseTo(expectResult);
      });
    });

    // getCenterLocation
    describe("getCenterLocation", () => {
      it("getCenterLocation 함수 실행 시 정상적인 데이터가 입력된 경우 위도 경도 중간값을 배열로 담아 반환해야 함", () => {
        const lat1 = 37.488992;
        const lng1 = 126.76352;
        const lat2 = 37.493098;
        const lng2 = 126.766922;
        const result = mapService.getCenterLocation({
          lat1,
          lng1,
          lat2,
          lng2,
        });
        const expectResult = [126.765221, 37.491045];
        expect(result).toEqual(expectResult);
      });

      it("getCenterLocation 함수 실행 시 정상적인 데이터가 입력된 경우 반환된 배열의 길이가 2여야 함", () => {
        const lat1 = 37.488992;
        const lng1 = 126.76352;
        const lat2 = 37.493098;
        const lng2 = 126.766922;
        const result = mapService.getCenterLocation({
          lat1,
          lng1,
          lat2,
          lng2,
        });
        expect(result).toHaveLength(2);
      });
    });
    // deg2rad
    describe("deg2rad", () => {
      it("deg2rad 함수에 도(Degree)입력 시, 라디안(Radian)으로 반환해야 함", () => {
        const deg = 180;
        const result = mapService.deg2rad(deg);
        expect(result).toBe(Math.PI);
      });
    });
    // getUsersInfo
    // return
  });
});
