import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../impl/create-user.command';

import { User, userArray } from '@app/common';
import { randomUUID } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { Metadata } from '@grpc/grpc-js';
// import { HeroRepository } from '../../repository/hero.repository';
// import { CreateUserCommand } from '../impl/kill-dragon.command';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand> {// this will go in index and from index in mdole import
    constructor(
        private jwtService: JwtService
    ) { }

    async execute(command: CreateUserCommand) {//createUserDto will be here inside command business logic will be implemented here


        console.log(command);// commands wrap data inside an object and name of key inside which data will be value is 
        let id = randomUUID()
        const token = this.jwtService.sign({ id })
        const user: User = {
            ...command.createUserDto,
            subscribed: false,
            socialMedia: {},
            id,
            token
        };
        userArray.push(user)
        console.log({ token })
        // console.log(userArray)
        user.token = token
        // Create metadata object and add token
        const metadata = new Metadata();
        metadata.set('token', token);

        // Set metadata in response
        (user as any).metadata = metadata;

        console.log("user, ", user)
        return user;



    }



}
