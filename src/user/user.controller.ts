import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { UsersService } from './user.service';
import { AuthUser } from 'src/auth/decorator/auth-user.decorator';

@Controller('users')
export class UsersController {
  constructor(private UserService: UsersService) {}

  @Get('search')
  @UseGuards(AuthGuard)
  async searchUsers(
    @AuthUser() user,
    @Query('firstName') firstName?: string,
    @Query('lastName') lastName?: string,
    @Query('email') email?: string,
    @Query('age') age?: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    const conditions: string[] = [];
    const params: any[] = [];

    if (firstName) {
      params.push(`%${firstName}%`);
      conditions.push(`first_name ILIKE $${params.length}`);
    }

    if (lastName) {
      params.push(`%${lastName}%`);
      conditions.push(`last_name ILIKE $${params.length}`);
    }

    if (email) {
      params.push(`%${email}%`);
      conditions.push(`last_name ILIKE $${params.length}`);
    }

    if (age) {
      params.push(age);
      conditions.push(`age = $${params.length}`);
    }
    const whereClause = conditions.length
      ? `WHERE ${conditions.join(' AND ')}`
      : '';

    const countQuery = `SELECT COUNT(*) FROM users ${whereClause}`;
    const totalResult = await this.UserService.query(countQuery, params);
    const count = totalResult.rows[0].count;
    const total = parseInt(count, 10);

    const offset = (page - 1) * limit;
    const sql = `SELECT id, first_name, last_name, email, age FROM users ${conditions.length ? 'WHERE ' + conditions.join(' AND ') : ''} limit ${limit} offset ${offset}`;
    const result = await this.UserService.query(sql, params);

    return {
      data: result.rows as UserDto[],
      total,
      page,
      limit,
    };
  }
}
