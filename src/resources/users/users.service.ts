import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User | null> {
    const foundUser = await this.usersRepository.findOne({
      login: createUserDto.login,
    });

    if (foundUser) return null;

    const password = await bcrypt.hash(createUserDto.password, 10);
    const userWithHash = { ...createUserDto, password };

    const createdUser = this.usersRepository.create(userWithHash);
    return await this.usersRepository.save(createdUser);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: string): Promise<User | null> {
    const user = await this.usersRepository.findOne(id);

    return user ?? null;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    const foundUser = await this.usersRepository.findOne(id);

    if (!foundUser) return null;

    const password = await bcrypt.hash(updateUserDto.password, 10);
    const userWithHash = { ...updateUserDto, password };

    return await this.usersRepository.save({ ...userWithHash, id });
  }

  async remove(id: string): Promise<User | null> {
    const foundUser = await this.usersRepository.findOne(id);

    if (!foundUser) return null;

    await this.usersRepository.delete(id);

    return foundUser;
  }
}
