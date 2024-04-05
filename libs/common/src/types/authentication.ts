/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export const protobufPackage = 'authentication';

export interface SignInDto {
  useremail: string;
  password: string;
}

export interface SignInMessage {
  message: string;
  accessToken: string;
}

export interface Token {
  accessToken: string;
}

export interface UserInfo {
  userId: string;
  userEmail: string;
}

export const AUTHENTICATION_PACKAGE_NAME = 'authentication';

export interface AuthenticationsServiceClient {
  signInUser(request: SignInDto): Observable<SignInMessage>;

  verifyUser(request: Token): Observable<UserInfo>;
}

export interface AuthenticationsServiceController {
  signInUser(
    request: SignInDto,
  ): Promise<SignInMessage> | Observable<SignInMessage> | SignInMessage;

  verifyUser(
    request: Token,
  ): Promise<UserInfo> | Observable<UserInfo> | UserInfo;
}

export function AuthenticationsServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['signInUser', 'verifyUser'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('AuthenticationsService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('AuthenticationsService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const AUTHENTICATIONS_SERVICE_NAME = 'AuthenticationsService';
