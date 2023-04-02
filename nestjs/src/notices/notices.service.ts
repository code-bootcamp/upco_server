import { Injectable, NotAcceptableException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Notice } from "./entites/notice.entity";
import {
  INoticesServiceCreate,
  INoticesServiceFindOne,
} from "./interfaces/notices-service.interface";

@Injectable()
export class NoticesService {
  constructor(
    @InjectRepository(Notice)
    private readonly noticesRepository: Repository<Notice>,
  ) {}

  noticeFindOne({ id }: INoticesServiceFindOne): Promise<Notice> {
    const result = this.noticesRepository.findOne({ where: { id } });
    if (!result) throw new NotAcceptableException();
    return result;
  }

  async noticeFindAll(): Promise<Notice[]> {
    const result = await this.noticesRepository.find();
    return result.sort(
      (a, b) =>
        this.extractNumberFromDate(b.createAt) -
        this.extractNumberFromDate(a.createAt),
    );
  }

  createNotice({ createNoticeInput }: INoticesServiceCreate): Promise<Notice> {
    const { title, contents } = createNoticeInput;
    return this.noticesRepository.save({
      title,
      contents,
    });
  }

  extractNumberFromDate(date: Date): number {
    return Number(date.toISOString().replace(/\D/g, ""));
  }
}
