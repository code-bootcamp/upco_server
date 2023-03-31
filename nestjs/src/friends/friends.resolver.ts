import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { IContext } from "src/common/interfaces/context";
import { Friend } from "./entities/friend.entity";
import { FriendsService } from "./friends.service";

@Resolver()
export class FriendsResolver {
  constructor(private readonly friendsService: FriendsService) {}

  @Query(() => [Friend])
  fetchFriends() {
    return this.friendsService.findFriends();
  }

  @Query(() => [Friend])
  fetchFriendRequests(
    @Context() context: IContext, //
  ) {
    const userId = context.req.user.id;
    return this.friendsService.findRequests({ userId });
  }

  // @Mutation(() => )
  rejectFriendRequest() {}

  // @Mutation(() => )
  acceptFriendRequest() {}

  // @Mutation(() =>)
  createFriendRequest() {
    return this.friendsService.createRequest();
  }

  @Mutation(() => Boolean)
  deleteFriend(@Args("opponentId") opponentId: string): Promise<boolean> {
    return this.friendsService.delete({ opponentId });
  }
}
