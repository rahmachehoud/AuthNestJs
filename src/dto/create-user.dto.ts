import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsString({ always: true })
  firstname: string;
  @IsString({ always: true })
  lastname: string;
  @IsString({ always: true })
  username: string;

  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsString({ always: true })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;
}
