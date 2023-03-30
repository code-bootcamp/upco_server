import { Injectable, NotAcceptableException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Interest } from "./entities/interest.entity";
import { IInterestServiceFindOneByInterest } from "./interfaces/interest-service.interface";

@Injectable()
export class InterestsService {
  constructor(
    @InjectRepository(Interest)
    private readonly interestRepository: Repository<Interest>, //
  ) {}

  findAll(): Promise<Interest[]> {
    return this.interestRepository.find();
  }

  async findOne({
    interestId,
  }: IInterestServiceFindOneByInterest): Promise<Interest> {
    const result = await this.interestRepository.findOne({
      where: { id: interestId },
    });
    if (!result) {
      throw new NotAcceptableException("해당 관심사를 찾을 수가 없습니다.");
    }
    return result;
  }

  async create({ createInterestInput }): Promise<Interest> {
    // await this.interestRepository.findOne({
    //   where: { id },
    // });
    // if (!list) {
    //   throw new NotAcceptableException("찾을 수 없음");
    // }
    return this.interestRepository.save({
      ...createInterestInput,
    });
  }
}
