import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ConflictException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IsAuthGuard } from '../auth/guards/is.auth.guard';

@Controller('users')
@UseGuards(IsAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);

    if (user === null) {
      throw new ConflictException();
    }
    return user.toResponse();
  }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();

    return users.map((user) => user.toResponse());
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);

    if (user === null) {
      throw new NotFoundException();
    }
    return user.toResponse();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user: User = await this.usersService.update(id, updateUserDto);

    if (user === null) {
      throw new NotFoundException();
    }

    return User.toResponse(user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const user = await this.usersService.remove(id);

    if (user === null) {
      throw new NotFoundException();
    }
    return user.toResponse();
  }
}
