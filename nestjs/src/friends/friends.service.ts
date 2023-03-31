import { Injectable, NotAcceptableException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersService } from "src/users/users.service";
import { Repository } from "typeorm";
import { Friend } from "./entities/friend.entity";
import { IFriendsServiceDelete } from "./interfaces/friend-service.interface";

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(Friend)
    private readonly friendsRepository: Repository<Friend>,

    private readonly usersService: UsersService,
  ) {}
  async findRequests({ userId }) {
    return this.friendsRepository.find({
      where: {
        receiver: {
          id: userId,
        },
      },
    });
  }

  async rejectRequests() {}

  async acceptRequest() {}

  async createRequest({ senderId, receiverId }) {
    const user = await this.usersService.findOneById({ userId: receiverId });

    if (!user) throw new NotAcceptableException("");

    return this.friendsRepository.create({
      sender: {
        id: senderId,
      },
      receiver: {
        id: receiverId,
      },
    });
  }
}
