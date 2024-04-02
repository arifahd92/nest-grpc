import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';
// import { UserService } from './user.service';
// import { UserController } from './user.controller';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UserModule { }
