import { Injectable } from "@nestjs/common";
import { IFilesServiceUpload } from "./interfaces/files-service.interface";

@Injectable()
export class FilesService {
  upload({ files }: IFilesServiceUpload): string {
    const a = files;

    console.log(a);

    return "hi";
  }
}
