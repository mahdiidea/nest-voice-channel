import {Controller, Post, Res, HttpStatus, UsePipes, ValidationPipe, Body} from '@nestjs/common';
import { Response } from 'express';
import {UserService} from "../user/user.service";
import {RegisterDto, LoginDto} from "./auth.dto";
import {User} from "../schemas/user.schema";

@Controller('auth')
export class AuthController {
    constructor(private readonly userService: UserService) {
    }

    @Post('login')
    @UsePipes(new ValidationPipe({transform: true}))
    login(@Body() loginDto: LoginDto, @Res() res: Response) {
       return res.status(HttpStatus.OK).json({wat: 1});
    }

    @Post('register')
    @UsePipes(new ValidationPipe({transform: true}))
    async register(@Body() registerDto: RegisterDto) {
        let user = new User();
        user.name = registerDto.name;
        user.email = registerDto.email;
        user.password = registerDto.password;

        const userModel = await this.userService.create(user);
        return userModel;
    }

}
