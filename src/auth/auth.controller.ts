import {
  Controller,
  Post,
  Res,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  Body,
} from '@nestjs/common';
import { User } from '../user/user.schema';
import { Response } from 'express';
import { UserService } from '../user/user.service';
import { RegisterDto, LoginDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService, private authService: AuthService) { }

  @Post('login')
  @UsePipes(new ValidationPipe({ transform: true }))
  login(@Body() loginDto: LoginDto, @Res() res: Response) {
    return res.status(HttpStatus.OK).json({ wat: 1 });
  }

  @Post('register')
  @UsePipes(new ValidationPipe({ transform: true }))
  async register(@Body() registerDto: RegisterDto) {

    let user = new User();
    user.name = registerDto.name;
    user.email = registerDto.email;
    user.password = registerDto.password;
    const userModel = await this.userService.create(user);
    const { password, ...result } = userModel['_doc'];
    
    return result;

  }
}
