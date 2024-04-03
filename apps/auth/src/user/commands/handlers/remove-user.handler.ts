import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { RemoveUserCommand } from "../impl/remove-user.command";
import { userArray } from "@app/common";
import { NotFoundException } from "@nestjs/common";

@CommandHandler(RemoveUserCommand)
export class RemoveUserCommandHandler implements ICommandHandler<RemoveUserCommand>{
    async execute(command: RemoveUserCommand) {
        const id = command.id
        const userIndex = userArray.findIndex((user) => user.id === id);
        if (userIndex !== -1) {
            return userArray.splice(userIndex)[0];
        }
        throw new NotFoundException(`User not found by id ${id}.`);
    }
}