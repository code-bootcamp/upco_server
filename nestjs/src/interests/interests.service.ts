import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, InsertResult, Repository } from "typeorm";
import { Interest } from "./entities/interest.entity";
import {
  IInterestsServiceBulkInsert,
  IInterestsServicefindByNames,
} from "./interfaces/interests-service.interface";

@Injectable()
export class InterestsService {
  constructor(
    @InjectRepository(Interest)
    private readonly interestsRepository: Repository<Interest>,
  ) {}

  async findByNames({
    interests,
  }: IInterestsServicefindByNames): Promise<Interest[]> {
    return await this.interestsRepository.find({
      where: { name: In([...interests]) },
    });
  }
  bulkInsert({ names }: IInterestsServiceBulkInsert): Promise<InsertResult> {
    return this.interestsRepository.insert([...names]);
  }
}
