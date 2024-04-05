import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
// import { FindOneQuery } from "../impl/findOne.query";
import { blogArray, userArray } from '@app/common';
import { FindOneQuery } from '../impl/findOne-blog.query';
import { JwtService } from '@nestjs/jwt';

@QueryHandler(FindOneQuery)
export class FindOneCommandHandler implements IQueryHandler {
  constructor(private jwtService: JwtService) {}

  async execute(query: any) {
    const { id, token } = query;
    console.log(`printing query`);
    console.log(query);
    //token verification
    try {
      const decodedToken = await this.jwtService.verifyAsync(token);
      // Token is verified, continue with blog creation
      // console.log({ decodedToken })

      const userId = decodedToken.id;
      console.log({ userId });
      console.log(id.id);
      console.log(blogArray);
      let index = blogArray.findIndex(
        (item) => item.userId === userId && item.id == id.id,
      );
      console.log({ index });
      if (index != -1) {
        return blogArray[index];
      }

      throw new Error('kkkk');
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
