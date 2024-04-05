import { SignInDto, authenticationArray } from '@app/common';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationsService {
  constructor(
    // private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signInUser2(signInDto: SignInDto) {
    console.log(`signin user inside service `);
    let index = authenticationArray.findIndex(
      (item) =>
        item.password === signInDto.password &&
        signInDto.useremail === signInDto.useremail,
    );
    if (index == -1) {
      throw new UnauthorizedException();
    }

    return {
      accessTpken: await this.jwtService.signAsync(signInDto),
    };
  }

  async verifyUser(token: any) {}
}
