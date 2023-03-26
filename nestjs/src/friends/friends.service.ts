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
    const result = await this.usersRepository.findOne({
      where: { id: userId },
    });
    if (!result) new NotAcceptableException("📌");

    await this.friendsRepository.findOne({
      where: {
        user: { id: userId },
        opponentId: opponentId,
        isSuccess,
      },
    });

    if (opponentId === userId) throw new NotAcceptableException();

    return await this.friendsRepository.save({
      user: { id: userId },
      opponentId,
      isSuccess,
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

  // ==================== test 로직 ======================

  async test({ opponentId, userId, isSuccess }): Promise<void> {
    // 1. 유저 검증 (user)
    if (opponentId === userId) throw new NotAcceptableException("✅"); // 본인에게 친구요청 불가

    //userId의 유저 검증
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });
    if (!user) throw new NotAcceptableException("존재하지 않은 유저");

    //opponentId의 유저 검증
    const opponent = await this.usersRepository.findOne({
      where: { id: opponentId },
    });
    if (!opponent) throw new NotAcceptableException("존재하지 않은 상대방");

    // 2. 친구 검증 (friend)
    // friend에 요청내역이 있는지 확인

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

    if (!isFriend1 && !isFriend2) {
      // 친구 요청 내역이 없는 경우, 새로운 친구 요청 보내기
      await this.friendsRepository.save({
        user: { id: userId },
        opponentId: opponentId,
        isSuccess: false,
      });

      await this.friendsRepository.save({
        user: { id: opponentId },
        opponentId: userId,
        isSuccess: isSuccess ? true : false,
      });

      // 3. 친구 수락 (opponentId가 true여야 수락) & 기존 row 'True'로 변경
      // user1 = False || user2 = True => 기존 row = False에서 True로 변환 update
    } else if (isFriend1 && !isFriend1.isSuccess) {
      // 이미 친구 요청을 보냈지만, 아직 수락하지 않은 경우
      throw new NotAcceptableException("이미 친구 요청을 보냈습니다.");
    } else if (isFriend2 && !isFriend2.isSuccess) {
      // 상대방이 친구 요청을 보냈지만, 아직 수락하지 않은 경우

      await this.friendsRepository.update(
        { user: { id: opponentId }, opponentId: userId },
        { isSuccess: true },
      );

      await this.friendsRepository.update(
        { user: { id: userId }, opponentId: opponentId },
        { isSuccess: true },
      );
    } else if (isFriend1 || isFriend2) {
      // 이미 친구인 경우
      throw new NotAcceptableException("이미 친구입니다.");
    } else {
      await this.friendsRepository.remove(isFriend1 || isFriend2);
    }

    return;
  }
}
