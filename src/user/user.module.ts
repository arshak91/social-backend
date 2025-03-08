import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    DatabaseModule
  ],
  providers: [UsersService]
})
export class UserModule {}
