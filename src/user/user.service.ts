
import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

export type User = any;

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) {};

  async findOne(email: string): Promise<User | undefined> {
    return (await this.db.query(`SELECT * FROM users WHERE email='${email}'`)).rows[0];
  };

  async query(query: string, params?: any[]){
    return this.db.query(query, params);
  }
}
