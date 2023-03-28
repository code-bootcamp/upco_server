import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Notice } from "./entites/notice.entity";
import { INoticesServiceCreate } from "./interfaces/notices-service.interface";

@Injectable()
export class NoticesService {
  constructor(
    @InjectRepository(Notice)
    private readonly noticesRepository: Repository<Notice>,
  ) {}

  findAll(): Promise<Notice[]> {
    return this.noticesRepository.find();
  }

  create({ createNoticeInput }: INoticesServiceCreate): Promise<Notice> {
    const { title, contents } = createNoticeInput;
    return this.noticesRepository.save({
      title,
      contents,
    });
  }
}
