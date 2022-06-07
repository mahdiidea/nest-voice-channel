import { Controller, Get, Param, Render } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get(':userId')
  @Render('index')
  show(@Param('userId') userId: string) {
    return { message: `This action returns a #${userId} cat` };
  }
}
