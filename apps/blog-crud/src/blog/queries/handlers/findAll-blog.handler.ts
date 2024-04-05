import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { FindAllQuery } from '../impl/findAll-blog.query';
import { blogArray } from '@app/common';
import { JwtService } from '@nestjs/jwt';

@QueryHandler(FindAllQuery)
export class FIndAllCommandHandler implements IQueryHandler {
  constructor(private jwtService: JwtService) {}
  async execute(query: any) {
    const { token } = query;

    try {
      const decodedToken = await this.jwtService.verifyAsync(token);
      // Token is verified, continue with blog creation
      console.log({ decodedToken });

      const userId = decodedToken.id;
      console.log({ userId });
      let blogs = blogArray.filter((item) => item.userId === userId);

      return { blogs };
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
