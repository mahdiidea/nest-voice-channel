import {IsEmail, IsNotEmpty, MaxLength, MinLength} from 'class-validator';

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