import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Blog, blogArray } from '@app/common';

import { JwtService } from '@nestjs/jwt';

import { RemoveBlogCommand } from '../impl/remove-blog.command';

@CommandHandler(RemoveBlogCommand)
export class RemoveBlogCommandHandler
  implements ICommandHandler<RemoveBlogCommand>
{
  constructor(private jwtService: JwtService) {}

  async execute(command: RemoveBlogCommand) {
    let { id, token } = command;

    console.log(token);
    if (!token) {
      return {
        message: 'failed',
        error: 'invalid signature',
        Blog: null,
      };
    }

    // Verify token
    try {
      const decodedToken = await this.jwtService.verifyAsync(token);
      // Token is verified, continue with blog creation
      console.log({ decodedToken });

      const userId = decodedToken.id;
      let index = blogArray.findIndex(
        (item) => item.userId === userId && item.id == id.id,
      );
      console.log(index, id?.id, userId);
      if (index != -1) {
        blogArray.splice(index, 1);
        return {
          message: 'success',
        };
      }
      return {
        message: 'failed',
      };
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
