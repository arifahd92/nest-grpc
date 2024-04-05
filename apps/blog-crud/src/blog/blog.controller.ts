import { Controller } from '@nestjs/common';

import { BlogService } from './blog.service';
import {
  BlogsServiceControllerMethods,
  CreateBlogDto,
  UpdateBlogDto,
} from '@app/common';
import { Metadata, MetadataValue, ServerUnaryCall } from '@grpc/grpc-js';

@Controller()
@BlogsServiceControllerMethods()
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  createBlog(
    createBlogDto: CreateBlogDto,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ) {
    console.log('metadata inside controller');
    console.log({ metadata });
    let token: MetadataValue[] | undefined = metadata.get('token');
    console.log(token[0], 'inside controller');
    return this.blogService.create(createBlogDto, token[0]);
  }

  findAllBlogs(data: any, metadata: Metadata, call: ServerUnaryCall<any, any>) {
    console.log(`inside findAll blogs now metadata`);
    console.log(metadata);
    let token: MetadataValue[] | undefined = metadata.get('token');
    console.log(token[0], 'inside controller');

    return this.blogService.findAll(token[0]);
  }

  findOneBlog(id: string, metadata: Metadata, call: ServerUnaryCall<any, any>) {
    let token: MetadataValue[] | undefined = metadata.get('token');

    return this.blogService.findOne(id, token[0]);
  }

  updateBlog(
    updateBlogDto: UpdateBlogDto,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ) {
    let token: MetadataValue[] | undefined = metadata.get('token');

    return this.blogService.update(updateBlogDto.id, updateBlogDto, token[0]);
  }

  removeBlog(id: string, metadata: Metadata, call: ServerUnaryCall<any, any>) {
    let token: MetadataValue[] | undefined = metadata.get('token');

    return this.blogService.remove(id, token[0]);
  }
}
