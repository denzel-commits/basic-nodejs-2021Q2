import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UsersService } from '../users/users.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  validateUser(request: Request): boolean {
    const authHeader = request.headers.get('authorization');
    const [token, authScheme] = authHeader && authHeader.split(' ');

    if (!token || authScheme !== 'Bearer') {
      throw new UnauthorizedException();
    }

    if (token !== undefined)
      jwt.verify(
        token,
        this.configService.get<string>('JWT_ACCESS_SECRET_KEY'),
        (err) => {
          if (err) {
            throw new UnauthorizedException();
          }
        },
      );

    return true;
  }

  async login(createAuthDto: CreateAuthDto): Promise<string> {
    const foundUser = await this.usersService.findOneByLogin(
      createAuthDto.login,
    );

    if (foundUser === null) return '';

    const isMatch = await bcrypt.compare(
      createAuthDto.password,
      foundUser.password,
    );

    if (isMatch) {
      const payload = { userId: foundUser.id, login: foundUser.login };
      return jwt.sign(
        payload,
        this.configService.get<string>('JWT_ACCESS_SECRET_KEY'),
      );
    }

    return '';
  }
}
