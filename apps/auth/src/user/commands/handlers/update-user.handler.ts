import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdatedUserCommand } from "../impl/update-user.command";
// import { randomUUID } from "crypto";
import { User, userArray } from "@app/common";
import { NotFoundException } from "@nestjs/common";

@CommandHandler(UpdatedUserCommand)
export class UpdateUserCommandHandler implements ICommandHandler<UpdatedUserCommand> {// this will go in index and from index in mdole import
    constructor(

    ) { }

    async execute(command: UpdatedUserCommand) {//updateUserDto will be here inside command business logic will be implemented here


        console.log("updateUserCommand executed ");// commands wrap data inside an object and name of key inside which data will be value is 
        let { id, updateUserDto } = command
        console.log(`command printed`)
        // console.log(id.id);
        // console.log(updateUserDto)
        console.log(command.id)
        const userIndex = userArray.findIndex((user) => user.id === id);
        if (userIndex !== -1) {
            userArray[userIndex] = {
                ...userArray[userIndex],
                ...updateUserDto,
            };
            let updated: User = userArray[userIndex]
            return updated;


        }
        throw new NotFoundException("id not found")

    }
}

/*
use below data for update
{
    "id": "123456",
    "socialMedia": {
        "fbUri": "id laboris dolore ut",
        "twitterUri": "velit exercitation aliqua do voluptate"
    }
}
*/