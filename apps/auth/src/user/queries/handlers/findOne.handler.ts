import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FindOneQuery } from "../impl/findOne.query";
import { userArray } from "@app/common";


@QueryHandler(FindOneQuery)
export class FindOneCommandHandler implements IQueryHandler {
    async execute(query: any) {
        const { id } = query
        return userArray.find((user) => user.id === id);

    }

}