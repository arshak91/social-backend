import { Controller, Post, Get, Body, Query, UseGuards, Put } from '@nestjs/common';
import { FriendDto } from './dto/friend.dto';
import { AuthUser } from 'src/auth/decorator/auth-user.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { FriendsService } from './friends.service';

@Controller('friends')
export class FriendsController {
  constructor(private friendsService: FriendsService) {}

  @Post('request')
  @UseGuards(AuthGuard)
  async sendRequest(
    @AuthUser() user,
    @Body() body: { toUserId: number }
  ) {
    await this.friendsService.create({
      fromUserId: user.sub,
      toUserId: body.toUserId
    })
    return { message: 'Friend request sent' };
  }

  @Get('requests')
  @UseGuards(AuthGuard)
  async viewRequests(
    @AuthUser() user,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    const userId = user.sub;
    console.log(user, userId);

    const offset = (page - 1) * limit;
    const params = [limit, offset];
    const query = `SELECT fr.*, u.first_name as name, u.last_name as lastName FROM friend_requests fr
      left join users u on u."id" = fr."from_user_id"
      WHERE to_user_id = $1 AND status = $2
      LIMIT ${limit} OFFSET ${offset};`
    const result = await this.friendsService.query(
      query,
      [userId, 'pending'],
    );

    const countQuery = `SELECT COUNT(*) FROM friend_requests WHERE to_user_id = $1 AND status = $2`;
    const totalResult = await this.friendsService.query(countQuery, [userId, 'pending'],);
    const count = totalResult.rows[0].count;
    const total = parseInt(count, 10);
    return {
      data: result.rows as FriendDto[],
      total,
      page,
      limit,
    };
  }

  @Put('respond')
  @UseGuards(AuthGuard)
  async respondRequest(
    @AuthUser() user,
    @Body() body: { requestId: number; accept: boolean }
  ) {
    const status = body.accept ? 'accepted' : 'declined';
    await this.friendsService.query(
      'UPDATE friend_requests SET status = $1 WHERE id = $2 AND to_user_id = $3',
      [status, body.requestId, user.sub],
    );
    return { message: `Request ${status}` };
  }
}
