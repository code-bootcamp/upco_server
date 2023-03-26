import { FileUpload } from "graphql-upload";

export interface IFilesServiceUpload {
  id: string;
  file: FileUpload;
}
