
import { CreateUserCommandHandler } from "./create-user.handler";
import { RemoveUserCommandHandler } from "./remove-user.handler";
import { UpdateUserCommandHandler } from "./update-user.handler";

export const CommandHandlers = [CreateUserCommandHandler, UpdateUserCommandHandler, RemoveUserCommandHandler];