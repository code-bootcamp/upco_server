export enum PROVIDER_ENUM {
  GOOGLE = "google",
  KAKAO = "kakao",
  CREDENTIALS = "credentials",
}

export interface IProvider {
  params: {
    soical: PROVIDER_ENUM;
  };
}
