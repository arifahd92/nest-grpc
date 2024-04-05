import { UpdateBlogDto } from "@app/common";

export class UpdateBlogCommand {
    constructor(
        public readonly id: string,
        public readonly updateBlogDto: UpdateBlogDto,
        public readonly token: string,

    ) { }
}