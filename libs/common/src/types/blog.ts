/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackageBlog = "blog";

export interface UpdateBlogDto {
  id: string;
  content: string;
  author: string;
}

export interface FindOneBlogDto {
  id: string;
}

export interface EmptyBlog {
}

export interface Blogs {
  blogs: Blog[];
}

export interface CreateBlogDto {
  content: string;
  author: string;
}

export interface Blog {
  id: string;
  content: string;
  author: string;
  userId: string;
}

export const BLOG_PACKAGE_NAME = "blog";

export interface BlogsServiceClient {
  createBlog(request: CreateBlogDto): Observable<Blog>;

  findAllBlogs(request: EmptyBlog): Observable<Blogs>;

  findOneBlog(request: FindOneBlogDto): Observable<Blog>;

  updateBlog(request: UpdateBlogDto): Observable<Blog>;

  removeBlog(request: FindOneBlogDto): Observable<Blog>;
}

export interface BlogsServiceController {
  createBlog(request: CreateBlogDto): Promise<Blog> | Observable<Blog> | Blog;

  findAllBlogs(request: EmptyBlog): Promise<Blogs> | Observable<Blogs> | Blogs;

  findOneBlog(request: FindOneBlogDto): Promise<Blog> | Observable<Blog> | Blog;

  updateBlog(request: UpdateBlogDto): Promise<Blog> | Observable<Blog> | Blog;

  removeBlog(request: FindOneBlogDto): Promise<Blog> | Observable<Blog> | Blog;
}

export function BlogsServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createBlog", "findAllBlogs", "findOneBlog", "updateBlog", "removeBlog"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("BlogsService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("BlogsService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const BLOGS_SERVICE_NAME = "BlogsService";
