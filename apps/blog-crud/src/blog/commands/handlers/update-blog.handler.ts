import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Blog, UpdateBlogDto, blogArray } from '@app/common';

import { JwtService } from '@nestjs/jwt';
import { Metadata } from '@grpc/grpc-js';
import { UpdateBlogCommand } from '../impl/update-blog.command';

@CommandHandler(UpdateBlogCommand)
export class UpdateBlogCommandHandler
  implements ICommandHandler<UpdateBlogCommand>
{
  constructor(private jwtService: JwtService) {}

  async execute(command: UpdateBlogCommand) {
    const { updateBlogDto, token } = command;
    console.log(token);
    if (!token) {
      return {
        message: 'failed',
        error: 'invalid signature',
        Blog: null,
      };
    }

    try {
      const decodedToken = await this.jwtService.verifyAsync(token);

      console.log({ decodedToken });
      let id = updateBlogDto.id;
      let index = blogArray.findIndex((item) => item.id == id);
      if (index !== -1) {
        let updatedData = { ...blogArray[index], ...updateBlogDto };
        blogArray[index] = updatedData;
        return updatedData;
      }
      console.log(``);
    } catch (error) {
      // Token verification failed
      console.error('Token verification failed:', error);
      // throw new Error('Token verification failed');
      return {
        message: 'failed',
        error: error.message,
        Blog: null,
      };
    }
  }
}
