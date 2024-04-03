import { CreateUserDto } from "@app/common";

export class CreateUserCommand {
    constructor(public readonly createUserDto: CreateUserDto) { }
}