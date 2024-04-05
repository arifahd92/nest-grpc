import { Controller } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import {
  AuthenticationsServiceControllerMethods,
  SignInDto,
} from '@app/common';

@Controller()
@AuthenticationsServiceControllerMethods()
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}
  signInUser(signInDto: SignInDto) {
    this.authenticationService.signIn(signInDto);
  }
  verifyUser() {
    console.log(`verify user`);
  }
}
