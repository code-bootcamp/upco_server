import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Interest } from "./entities/interest.entity";
import { IInterestsServiceFindByNames } from "./interfaces/interest-service.interface";

const INTERESTS = [
  "INTJ",
  "INTP",
  "INFJ",
  "INFP",
  "ISTJ",
  "ISFJ",
  "ISTP",
  "ISFP",
  "ENTJ",
  "ENTP",
  "ENFJ",
  "ENFP",
  "ESTJ",
  "ESFJ",
  "ESTP",
  "ESFP",
  "헬스",
  "스케이트보드",
  "전자기기",
  "노래",
  "영화",
  "드라마",
  "패션",
  "댄스",
  "뮤지컬",
  "전시회",
  "산책",
  "등산",
  "맛집",
  "카페",
  "연예인",
  "주식",
  "게임",
  "드라이브",
  "여행",
];

@Injectable()
export class InterestsService {
  constructor(
    @InjectRepository(Interest)
    private readonly interestRepository: Repository<Interest>, //
  ) {}

  async create(): Promise<string> {
    const interests = INTERESTS.map((name) =>
      this.interestRepository.create({
        name,
      }),
    );

    await this.interestRepository.insert(interests);
    return "저장 완료";
  }

  async findByNames({
    names,
  }: IInterestsServiceFindByNames): Promise<Interest[]> {
    return await this.interestRepository.find({
      where: { name: In(names) },
    });
  }
}
