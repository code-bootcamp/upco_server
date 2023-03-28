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

  async createFriend({ opponentId, userId, isSuccess }) {
    if (opponentId === userId)
      throw new NotAcceptableException("같은 ID는 친구로 추가할 수 없습니다.");

    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });
    if (!user) throw new NotAcceptableException("존재하지 않은 유저");

    const opponent = await this.usersRepository.findOne({
      where: { id: opponentId },
    });
    if (!opponent) throw new NotAcceptableException("존재하지 않은 상대방");

    const isFriend1 = await this.friendsRepository.findOne({
      where: {
        user: { id: userId },
        opponentId: opponentId,
      },
    });

    const isFriend2 = await this.friendsRepository.findOne({
      where: {
        user: { id: opponentId },
        opponentId: userId,
      },
    });

    if (!isFriend1) {
      // 친구 요청 내역이 없는 경우, 새로운 친구 요청 보내기
      await this.friendsRepository.save({
        user: { id: userId },
        opponentId: opponentId,
        isSuccess,
      });
    } else if (!isFriend2) {
      await this.friendsRepository.save({
        user: { id: opponentId },
        opponentId: userId,
        isSuccess,
      });
    }

    return;
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
