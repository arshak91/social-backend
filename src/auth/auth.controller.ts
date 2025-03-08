import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCreateDto } from 'src/user/dto/user.dto';


@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;

    const token = await this.authService.signIn(email, password);

    return token;
  }

  @Post('register')
  async register(
    @Body()
    body: UserCreateDto,
  ) {
    return await this.authService.registration(body);
  }
}
