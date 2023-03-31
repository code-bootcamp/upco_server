import { Injectable, NotAcceptableException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersService } from "src/users/users.service";
import { DataSource, Repository } from "typeorm";
import { Friend } from "./entities/friend.entity";
import {
  IFriendsServiceIdAndReceiverId,
  IFriendsServiceSenderIdAndReceiverId,
  IFriendsServiceUserId,
} from "./interfaces/friend-service.interface";

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(Friend)
    private readonly friendsRepository: Repository<Friend>,

    private readonly usersService: UsersService,

    private readonly dataSource: DataSource,
  ) {}
  async findRequests({ userId }: IFriendsServiceUserId): Promise<Friend[]> {
    return this.friendsRepository.find({
      where: {
        receiver: {
          id: userId,
        },
      },
    });
  }

  async findFriends({ userId }: IFriendsServiceUserId): Promise<Friend[]> {
    return this.friendsRepository.find({
      where: {
        sender: {
          id: userId,
        },
        status: true,
      },
    });
  }

  async findRequestBySenderIdAndReceiverId({
    senderId,
    receiverId,
  }: IFriendsServiceSenderIdAndReceiverId): Promise<Friend> {
    return this.friendsRepository.findOne({
      where: {
        sender: {
          id: senderId,
        },
        receiver: {
          id: receiverId,
        },
      },
    });
  }

  async findRequestByIdAndReceiverId({
    id,
    receiverId,
  }: IFriendsServiceIdAndReceiverId): Promise<Friend> {
    return this.friendsRepository.findOne({
      where: {
        id,
        receiver: {
          id: receiverId,
        },
      },
    });
  }

  async rejectRequests({
    id,
    receiverId,
  }: IFriendsServiceIdAndReceiverId): Promise<boolean> {
    await this.verifyRequest({ id, receiverId });

    const result = await this.friendsRepository.delete({ id });

    return result.affected ? true : false;
  }

  async acceptRequest({
    id,
    receiverId,
  }: IFriendsServiceIdAndReceiverId): Promise<Friend[]> {
    await this.verifyRequest({ id, receiverId });

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const request = await queryRunner.manager.findOne(Friend, {
        where: { id },
        relations: ["sender", "receiver"],
        select: {
          id: true,
          receiver: {
            id: true,
          },
          sender: {
            id: true,
          },
        },
      });

      const updateRequest = this.friendsRepository.create({
        ...request,
        status: true,
      });

      await queryRunner.manager.save(updateRequest);

      const newRequest = this.friendsRepository.create({
        sender: {
          id: request.receiver.id,
        },
        receiver: {
          id: request.sender.id,
        },
        status: true,
      });

      const addedFriend = await queryRunner.manager.save(newRequest);

      await queryRunner.commitTransaction();

      return [updateRequest, addedFriend];
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      queryRunner.release();
    }
  }

  async verifyRequest({
    id,
    receiverId,
  }: IFriendsServiceIdAndReceiverId): Promise<void> {
    const request = await this.findRequestByIdAndReceiverId({ id, receiverId });

    if (!request || request.status) throw new NotAcceptableException("");
  }

  async createRequest({
    senderId,
    receiverId,
  }: IFriendsServiceSenderIdAndReceiverId): Promise<Friend> {
    if (senderId === receiverId) throw new NotAcceptableException("");

    const user = await this.usersService.findOneById({ userId: receiverId });

    if (!user) throw new NotAcceptableException("");

    const request = await this.findRequestBySenderIdAndReceiverId({
      senderId,
      receiverId,
    });

    if (request) throw new NotAcceptableException("");

    return this.friendsRepository.save({
      sender: {
        id: senderId,
      },
      receiver: {
        id: receiverId,
      },
    });
  }

  async deleteFriend({
    senderId,
    receiverId,
  }: IFriendsServiceSenderIdAndReceiverId): Promise<boolean> {
    const friendShip = await this.findRequestBySenderIdAndReceiverId({
      senderId,
      receiverId,
    });

    if (!friendShip) throw new NotAcceptableException("");

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const oneside = await queryRunner.manager.delete(Friend, {
        id: friendShip.id,
      });

      const otherside = await queryRunner.manager.delete(Friend, {
        sender: {
          id: receiverId,
        },
        receiver: {
          id: senderId,
        },
      });

      await queryRunner.commitTransaction();

      console.log(oneside.affected);

      return oneside.affected & otherside.affected ? true : false;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      queryRunner.release();
    }
  }
}
