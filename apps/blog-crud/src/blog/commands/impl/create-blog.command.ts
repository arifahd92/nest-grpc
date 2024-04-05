import { CreateBlogDto } from "@app/common";

export class CreateBlogCommand {
    constructor(
        public readonly createBlogDto: CreateBlogDto,
        public readonly token: string
    ) { }
}