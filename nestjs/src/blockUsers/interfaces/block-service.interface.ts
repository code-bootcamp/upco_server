export interface IBlockUsersServiceDelete {
  blockUserId: string;
}

export interface IBlockUsersServiceCreate {
  blockUserId: string;
  userId: string;
}

export interface IReportUsersServiceCreate {
  reportedId: string;
  userId: string;
}
