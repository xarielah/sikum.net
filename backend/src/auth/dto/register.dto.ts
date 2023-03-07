import { IsString, IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MaxLength(16)
  firstName: string;

  @IsString()
  @MaxLength(32)
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
