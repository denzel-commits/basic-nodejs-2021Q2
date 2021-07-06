import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
} from '@nestjs/common';
import { AuthService } from './resources/auth/auth.service';
import { AppService } from './app.service';
import { CreateAuthDto } from './resources/auth/dto/create-auth.dto';

@Controller()
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

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
