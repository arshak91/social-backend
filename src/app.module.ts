import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseService } from './database/database.service';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { UsersController } from './user/user.controller';
import { FriendsController } from './friends/friends.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { UsersService } from './user/user.service';
import { jwtConstants } from './auth/constants';
import { FriendsService } from './friends/friends.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    JwtModule.registerAsync({
      useFactory: async () => {
        return {
          global: true,
          secret: jwtConstants.secret,
          signOptions: { expiresIn: jwtConstants.interval }
        }
      }
    }),
    AuthModule,
    UserModule,
    DatabaseModule,
  ],
  controllers: [
    AppController,
    AuthController,
    UsersController,
    FriendsController,
  ],
  providers: [AppService, DatabaseService, AuthService, UsersService, FriendsService],
})
export class AppModule {}
