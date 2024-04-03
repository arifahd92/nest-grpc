import { UpdateUserDto } from "@app/common";

export class UpdatedUserCommand {
    constructor(
        public readonly id: string,
        public readonly updateUserDto: UpdateUserDto,
    ) { }

}