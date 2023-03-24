import { Storage } from "@google-cloud/storage";
import { Injectable } from "@nestjs/common";
import { IFilesServiceUpload } from "./interfaces/files-service.interface";

@Injectable()
export class FilesService {
  async upload({ file }: IFilesServiceUpload): Promise<string> {
    const storage = new Storage({
      projectId: process.env.GCP_STORAGE_ID,
      keyFilename: process.env.GCP_STORAGE_KEYFILE,
    }).bucket(process.env.GCP_STORAGE_BUCKET);

    const temp = file
      .createReadStream()
      .pipe(
        storage
          .file(`${process.env.GCP_STORAGE_BUCKET}/${file.filename}`)
          .createWriteStream(),
      );
    console.log(temp);
    return "테스트";
  }
}
