import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class IsAuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers.authorization;
    const authScheme = authHeader && authHeader.split(' ')[0];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token || authScheme !== 'Bearer') {
      throw new UnauthorizedException();
    }

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
}
