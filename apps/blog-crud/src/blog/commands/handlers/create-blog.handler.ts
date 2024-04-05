import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Blog, blogArray, blogResponse } from '@app/common';
import { randomUUID } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { Metadata, MetadataValue } from '@grpc/grpc-js';
import { CreateBlogCommand } from '../impl/create-blog.command';

@CommandHandler(CreateBlogCommand)
export class CreateBlogCommandHandler
  implements ICommandHandler<CreateBlogCommand>
{
  constructor(private jwtService: JwtService) {}

  async execute(command: CreateBlogCommand): Promise<blogResponse> {
    const { createBlogDto, token } = command;
    console.log(token);
    if (!token) {
      return {
        message: 'failed',
        error: 'invalid signature',
        Blog: null,
      };
    }
    let id = randomUUID();

    // Verify token
    try {
      const decodedToken = await this.jwtService.verifyAsync(token);
      // Token is verified, continue with blog creation
      console.log({ decodedToken });
      const blog: Blog = {
        ...createBlogDto,
        id,
        userId: decodedToken.id, // Assuming userId is present in the token payload
      };
      blogArray.push(blog);
      console.log(`blog array`);
      console.log(blogArray);
      return {
        message: 'success',
        error: '',
        Blog: blog,
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
