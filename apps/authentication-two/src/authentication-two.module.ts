import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [AuthenticationTwoModule, AuthenticationModule],
  controllers: [],
  providers: [],
})
export class AuthenticationTwoModule {}
console.log(`iji`);
