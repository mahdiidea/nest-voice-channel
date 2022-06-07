import { IsEmail, IsNotEmpty, MaxLength, MinLength, Validate } from 'class-validator';
import { UserEmailValidation } from 'src/user/user.email.validation';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(32)
  password: string;
}

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  @Validate(UserEmailValidation, {
    message: 'Email already exist',
  })
  email: string;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(128)
  name: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(32)
  password: string;
}
