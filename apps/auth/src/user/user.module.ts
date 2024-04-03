import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';
import { CommandHandlers } from './commands/handlers';
import { CqrsModule } from '@nestjs/cqrs';
import { QueryHandlers } from './queries/handlers';

@Module({
  imports: [
    CqrsModule,
    ConfigModule.forRoot(), // Import ConfigModule to provide ConfigService
    JwtModule.registerAsync({
      imports: [ConfigModule], // Import ConfigModule here
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<number>('JWT_EXPIRES'),
        },
      }),
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, ...CommandHandlers, ...QueryHandlers],
})
export class UserModule { }
