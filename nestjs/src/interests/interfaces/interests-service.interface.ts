export interface IInterestsServicefindByNames {
  interests: string[];
}

export interface IInterestsServiceBulkInsert {
  names: {
    name: string;
  }[];
}
