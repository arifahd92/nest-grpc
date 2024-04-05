import { CreateBlogDto, UpdateBlogDto } from '@app/common';
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateBlogCommand } from './commands/impl/create-blog.command';
import { FindAllQuery } from './queries/impl/findAll-blog.query';
import { FindOneQuery } from './queries/impl/findOne-blog.query';
import { UpdateBlogCommand } from './commands/impl/update-blog.command';
import { RemoveBlogCommand } from './commands/impl/remove-blog.command';

@Injectable()
export class BlogService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  create(createBlogDto: CreateBlogDto, token: any) {
    console.log({ createBlogDto });
    return this.commandBus.execute(new CreateBlogCommand(createBlogDto, token));
  }

  findAll(token: any) {
    return this.queryBus.execute(new FindAllQuery(token));
  }

  findOne(id: string, token: any) {
    return this.queryBus.execute(new FindOneQuery(id, token));
  }

  update(id: string, updateBlogDto: UpdateBlogDto, token: any) {
    return this.commandBus.execute(
      new UpdateBlogCommand(id, updateBlogDto, token),
    );
  }

  remove(id: any, token: any) {
    console.log(`inside remove service`);
    return this.commandBus.execute(new RemoveBlogCommand(id, token));
  }
}
