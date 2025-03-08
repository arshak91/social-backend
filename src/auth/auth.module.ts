import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/database/database.module';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from 'src/user/user.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    JwtModule,
    ConfigModule,
    PassportModule,
    DatabaseModule,
  ],
  providers: [AuthService, UsersService ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
