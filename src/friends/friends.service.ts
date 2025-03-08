import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { FriendDto } from './dto/friend.dto';

@Injectable()
export class FriendsService {
  constructor(private readonly db: DatabaseService) {};

  async findOne(email: string): Promise<FriendDto | undefined> {
    return (await this.db.query(`SELECT * FROM users WHERE email='${email}'`)).rows[0];
  };

  async create(data: { fromUserId: number, toUserId: number }): Promise<any> {
    const query = 'INSERT INTO friend_requests (from_user_id, to_user_id, status) VALUES ($1, $2, $3)'
    const params = [data.fromUserId, data.toUserId, 'pending'];
    const result = await this.db.query(query, params);
    console.log(result);
    return result;
  };

  async query(query: string, params?: any[]){
    return this.db.query(query, params);
  }
}
