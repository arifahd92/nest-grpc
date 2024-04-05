import { Controller } from '@nestjs/common';

import { Metadata, MetadataValue, ServerUnaryCall } from '@grpc/grpc-js';
import {
  AuthenticationsServiceControllerMethods,
  SignInDto,
  Token,
} from '@app/common';
import { AuthenticationsService } from './auth.service';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
@AuthenticationsServiceControllerMethods()
export class AuthController {
  constructor(private readonly authService: AuthenticationsService) {}

  @GrpcMethod('AuthenticationsService', 'signInUser')
  signInUser(
    signInDto: SignInDto,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ) {
    console.log('metadata inside controller');
    console.log({ metadata });
    let token: MetadataValue[] | undefined = metadata.get('token');
    console.log(token[0], 'inside controller');
    return this.authService.signInUser2(signInDto);
  }
  @GrpcMethod('AuthenticationsService', 'verifyUser')
  verifyUser(
    token: Token,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ) {
    return this.authService.verifyUser(token);
  }
}
