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

  async createFriend({ opponentId, userId }) {
    const user = await this.friendsRepository.findOne({
      where: {
        user: { id: userId },
        opponentId: opponentId,
      },
    });
    if (!user) new NotAcceptableException();

    return await this.friendsRepository.save({
      user: { id: userId },
      opponentId,
      success: false,
    });
  }

  findFriendAll() {
    return this.friendsRepository.find();
  }

  async delete({ opponentId }: IFriendsServiceDelete): Promise<boolean> {
    const result = await this.friendsRepository.delete({
      opponentId,
    });
    return result.affected ? true : false;
  }
}
