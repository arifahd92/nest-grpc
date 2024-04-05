import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { QueryHandlers } from './queries/handlers';
import { CommandHandlers } from './commands/handlers/indes';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    CqrsModule,
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<number>('JWT_EXPIRES'),
        },
      }),
    }),
  ],
  controllers: [BlogController],
  providers: [BlogService,
    ...QueryHandlers,
    ...CommandHandlers],
})
export class BlogModule { }
