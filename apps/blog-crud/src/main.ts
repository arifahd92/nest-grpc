import { NestFactory } from '@nestjs/core';
import { BlogCrudModule } from './blog-crud.module';

async function bootstrap() {
  const app = await NestFactory.create(BlogCrudModule);
  await app.listen(3000);
}
bootstrap();
