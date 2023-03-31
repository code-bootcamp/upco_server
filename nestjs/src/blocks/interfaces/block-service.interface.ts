export interface IBlocksServiceFindBlocks {
  userId: string;
}

export interface IBlocksServiceFindOneByBlockerIdAndBlockedUserId {
  blockerId: string;
  blockedUserId: string;
}

export interface IBlocksServiceFindOneByIdAndBlockerId {
  id: string;
  blockerId: string;
}

export interface IBlcosServiceCreate {
  userId: string;
  blockedUserId: string;
}

export interface IBlcosServiceDelete {
  id: string;
  blockerId: string;
}
