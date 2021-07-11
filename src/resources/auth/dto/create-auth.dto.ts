import { MinLength } from 'class-validator';
export class CreateAuthDto {
  @MinLength(3)
  login: string;
  @MinLength(5)
  password: string;
}
