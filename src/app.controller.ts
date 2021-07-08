import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  UseFilters,
} from '@nestjs/common';
import { AuthService } from './resources/auth/auth.service';
import { AppService } from './app.service';
import { CreateAuthDto } from './resources/auth/dto/create-auth.dto';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';

@Controller()
@UseFilters(HttpExceptionFilter)
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() createAuthDto: CreateAuthDto) {
    const accessToken = await this.authService.login(createAuthDto);

    if (accessToken === '') {
      throw new ForbiddenException();
    }

    return { token: accessToken };
  }

  @Get('failed')
  getFail(): string {
    throw Error('unhandled');
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
