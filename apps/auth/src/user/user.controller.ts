import { Controller } from '@nestjs/common';
// import { UsersService } from './userService';
import {
  UsersServiceController,
  CreateUserDto,
  UpdateUserDto,
  UsersServiceControllerMethods,
  FindOneUserDto,
  PaginationDto,
  User,
} from '@app/common';
import { Observable } from 'rxjs';
import { UsersService } from './user.service';
import { Metadata } from '@grpc/grpc-js';
// import { CommandBus, QueryBus } from '@nestjs/cqrs';

@Controller()
@UsersServiceControllerMethods()
export class UsersController implements UsersServiceController {
  constructor(
    private readonly usersService: UsersService
  ) { }


  createUser(createUserDto: CreateUserDto,): any {

    // console.log(metadata.get('token'))
    return this.usersService.create(createUserDto);
  }

  findAllUsers() {
    return this.usersService.findAll();
  }

  findOneUser(findOneUserDto: FindOneUserDto) {
    return this.usersService.findOne(findOneUserDto.id);
  }

  updateUser(updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto.id, updateUserDto);
  }

  removeUser(findOneUserDto: FindOneUserDto) {
    return this.usersService.remove(findOneUserDto.id);
  }

  queryUsers(paginationDtoStream: Observable<PaginationDto>) {
    return this.usersService.queryUsers(paginationDtoStream);
  }
}