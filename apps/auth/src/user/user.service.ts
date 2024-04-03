import { Injectable } from '@nestjs/common';
import {
  User,
  CreateUserDto,
  UpdateUserDto,
  Users,
  PaginationDto,
} from '@app/common';

import { Observable, Subject } from 'rxjs';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './commands/impl/create-user.command';

import { UpdatedUserCommand } from './commands/impl/update-user.command';
import { RemoveUserCommand } from './commands/impl/remove-user.command';
import { FindAllQuery } from './queries/impl/findAll.query';
import { FindOneQuery } from './queries/impl/findOne.query';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) { }

  // onModuleInit() {
  //   console.log(`executed on module in it`)
  //   for (let i = 0; i <= 10; i++) {
  //     this.create({ username: randomUUID(), password: randomUUID(), age: 0 });
  //   }
  // }

  create(createUserDto: CreateUserDto): Promise<User> {


    return this.commandBus.execute(new CreateUserCommand(createUserDto));// createUserDto chahiye command.createUserDto se milega handeler k andar
    // return user;
  }

  findAll() {//type Users
    // return { users: this.users };//
    return this.queryBus.execute(new FindAllQuery());
  }

  findOne(id: string) {// type User
    // return this.users.find((user) => user.id === id);
    return this.queryBus.execute(new FindOneQuery(id));
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.commandBus.execute(new UpdatedUserCommand(id, updateUserDto));
    // console.log(updateUserDto);
    // const userIndex = this.users.findIndex((user) => user.id === id);
    // if (userIndex !== -1) {
    //   this.users[userIndex] = {
    //     ...this.users[userIndex],
    //     ...updateUserDto,
    //   };
    //   return this.users[userIndex];
    // }
    // throw new NotFoundException(`User not found by id ${id}.`);
  }

  remove(id: string) {
    // const userIndex = this.users.findIndex((user) => user.id === id);
    // if (userIndex !== -1) {
    //   return this.users.splice(userIndex)[0];
    // }
    // throw new NotFoundException(`User not found by id ${id}.`);
    return this.commandBus.execute(new RemoveUserCommand(id))
  }

  queryUsers(
    paginationDtoStream: Observable<PaginationDto>,
  ): Observable<Users> {
    const subject = new Subject<Users>();

    const onNext = (paginationDto: PaginationDto) => {
      const start = paginationDto.page * paginationDto.skip;
      subject.next({
        users: this.users.slice(start, start + paginationDto.skip),
      });
    };
    const onComplete = () => subject.complete();
    paginationDtoStream.subscribe({
      next: onNext,
      complete: onComplete,
    });

    return subject.asObservable();
  }
}