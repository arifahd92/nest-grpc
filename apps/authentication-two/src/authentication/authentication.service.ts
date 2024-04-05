import { SignInDto } from '@app/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthenticationService {
  signIn(signInDto: SignInDto) {
    console.log({ signInDto });
  }
}
