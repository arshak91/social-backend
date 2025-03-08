
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';
import { UserCreateDto } from 'src/user/dto/user.dto';


@Injectable()
export class AuthService {
  constructor(
    private readonly db: DatabaseService,
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(
    email: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(email);
    const isValid = await bcrypt.compare(pass, user.password);
    if (!isValid) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async registration(body: UserCreateDto) {
    const { firstName, lastName, email, password, age } = body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      await this.db.query(
        'INSERT INTO users (first_name, last_name, email, age, password) VALUES ($1, $2, $3, $4, $5)',
        [firstName, lastName, email, age, hashedPassword],
      );
      return { message: 'User registered successfully' };
    } catch (_error) {
      throw new HttpException('Error registering user', HttpStatus.BAD_REQUEST);
    }
  }
}
