import { Storage } from "@google-cloud/storage";
import { Injectable, NotAcceptableException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { IUsersServiceUpdate } from "src/users/interfaces/user-service.interface";
import { UsersService } from "src/users/users.service";
import { Repository } from "typeorm";
import { IFilesServiceUpload } from "./interfaces/files-service.interface";

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, //
    private readonly userService: UsersService, //
  ) {}

  async upload({ id, file }: IFilesServiceUpload): Promise<string> {
    const storage = new Storage({
      projectId: process.env.GCP_STORAGE_ID,
      keyFilename: process.env.GCP_STORAGE_KEYFILE,
    }).bucket(process.env.GCP_STORAGE_BUCKET);

    const url = `${id}.${file.filename.split(".").at(-1)}`;

    try {
      // 이미지를 버킷에 저장하는 로직입니다.
      file.createReadStream().pipe(storage.file(url).createWriteStream());
      const user = await this.userService.findOneById({ id });

      // 이미지 URL을 유저 DB에 저장하는 로직입니다.
      const input: IUsersServiceUpdate = {
        id,
        updateUserInput: {
          ...user,
          image: url,
        },
      };
      await this.userService.update(input);
      return url;
    } catch (error) {
      throw new NotAcceptableException();
    }
  }
}
