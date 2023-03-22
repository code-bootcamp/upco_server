import { Injectable, NotAcceptableException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { Friend } from "./entities/friend.entity";
import { IFriendsServiceDelete } from "./interfaces/friend-service.interface";

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(Friend)
    private readonly friendsRepository: Repository<Friend>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  findFriendOne({ opponentId }) {
    return this.friendsRepository.findOne({ where: opponentId });
  }

  findFriendAll() {
    return this.friendsRepository.find();
  }

  async createFriend({ userId, opponentId }) {
    const user = await this.friendsRepository.findOne({
      where: {
        user: { id: userId },
        opponentId: opponentId,
      },
    });
    if (user) throw new NotAcceptableException();
    return this.friendsRepository.save({
      user: { id: userId },
      opponentId,
      success: false,
    });
  }

  async delete({ opponentId }: IFriendsServiceDelete): Promise<boolean> {
    const result = await this.friendsRepository.delete({
      opponentId,
    });
    return result.affected ? true : false;
  }
}
