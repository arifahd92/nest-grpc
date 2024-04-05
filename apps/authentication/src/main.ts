import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AuthenticationConstant } from '@app/common';
import { join } from 'path';

import { AuthenticationModule } from './authentication.module';

async function bootstrap() {
  console.log('dirname', __dirname);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthenticationModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, '../auth/authentication.proto'),
        package: AuthenticationConstant,
        url: 'localhost:6000',
      },
    },
  );
  await app.listen();
}
bootstrap();
