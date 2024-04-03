import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FindAllQuery } from "../impl/findAll.query";
import { userArray } from "@app/common";

@QueryHandler(FindAllQuery)
export class FIndAllCommandHandler implements IQueryHandler {
    async execute(query: any) {
        console.log(`inside findAllCommandHandler`)
        console.log({ userArray })
        return { users: userArray }

    }

}