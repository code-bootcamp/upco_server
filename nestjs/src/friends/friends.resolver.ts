import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { IContext } from "src/common/interfaces/context";
import { Friend } from "./entities/friend.entity";
import { FriendsService } from "./friends.service";

@Resolver()
export class FriendsResolver {
  constructor(private readonly friendsService: FriendsService) {}

  @Query(() => [Friend])
  fetchFirends(
    @Context() context: IContext, //
  ): Promise<Friend[]> {
    const userId = context.req.user.id;
    return this.friendsService.findFriends({ userId });
  }

  @Query(() => [Friend])
  fetchFriendRequests(
    @Context() context: IContext, //
  ): Promise<Friend[]> {
    const userId = context.req.user.id;
    return this.friendsService.findRequests({ userId });
  }

  @Mutation(() => Boolean)
  rejectFriendRequest(
    @Context() context: IContext,
    @Args("requestId") id: string,
  ): Promise<boolean> {
    const receiverId = context.req.user.id;
    return this.friendsService.rejectRequests({ id, receiverId });
  }

  @Mutation(() => [Friend])
  acceptFriendRequest(
    @Context() context: IContext,
    @Args("requestId") id: string,
  ): Promise<Friend[]> {
    const receiverId = context.req.user.id;
    return this.friendsService.acceptRequest({ id, receiverId });
  }

  @Mutation(() => Friend)
  createFriendRequest(
    @Context() context: IContext, //
    @Args("receiverId") receiverId: string, //
  ): Promise<Friend> {
    const senderId = context.req.user.id;
    return this.friendsService.createRequest({ senderId, receiverId });
  }

  @Mutation(() => Boolean)
  deleteFriend(
    @Context() context: IContext,
    @Args("friendId") receiverId: string,
  ): Promise<boolean> {
    const senderId = context.req.user.id;
    return this.friendsService.deleteFriend({ senderId, receiverId });
  }
}
