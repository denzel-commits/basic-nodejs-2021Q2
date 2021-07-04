import { MinLength } from 'class-validator';

export class CreateUserDto {
  id?: string;

  @MinLength(3)
  name: string;

  @MinLength(3)
  login: string;

  @MinLength(8)
  password: string;
}
