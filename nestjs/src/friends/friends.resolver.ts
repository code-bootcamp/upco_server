import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Friend } from "./entities/friend.entity";
import { FriendsService } from "./friends.service";

@Resolver()
export class FriendsResolver {
  constructor(private readonly friendsService: FriendsService) {}

  @Mutation(() => Friend)
  addFriend(
    @Args("isSuccess") isSuccess: boolean,
    @Args("userId") userId: string,
    @Args("opponentId") opponentId: string,
  ) {
    return this.friendsService.createFriend({ userId, opponentId, isSuccess });
  }

  @Query(() => [Friend])
  fetchFriends() {
    return this.friendsService.findFriendAll();
  }

  @Mutation(() => Boolean)
  deleteFriend(@Args("opponentId") opponentId: string): Promise<boolean> {
    return this.friendsService.delete({ opponentId });
  }
}
