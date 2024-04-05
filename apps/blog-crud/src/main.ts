import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { BlogConstant } from '@app/common';
import { join } from 'path';
import { BlogCrudModule } from './blog-crud.module';

async function bootstrap() {
  console.log("dirname", __dirname)
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    BlogCrudModule, {
    transport: Transport.GRPC,
    options: {
      protoPath: join(__dirname, '../auth/blog.proto'),
      package: BlogConstant,
      url: "localhost:5060"
    }
  }

  )
  await app.listen();


}
bootstrap();

