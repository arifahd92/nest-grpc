import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AuthenticationConstant } from '@app/common';
import { join } from 'path';
import { AuthenticationTwoModule } from './authentication-two.module';
// import { BlogCrudModule } from './blog-crud.module';

async function bootstrap() {
  console.log('dirname', __dirname);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthenticationTwoModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, '../auth/authentication.proto'),
        package: AuthenticationConstant,
      },
    },
  );
  await app.listen();
}
bootstrap();
