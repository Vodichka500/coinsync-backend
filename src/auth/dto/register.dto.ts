import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email!: string;
  @IsNotEmpty()
  @IsString()
  name!: string;
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password!: string;
  @IsNotEmpty()
  confirmPassword!: string;
}
