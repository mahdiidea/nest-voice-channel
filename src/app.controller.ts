import {Controller, Get, Render} from '@nestjs/common';
import {AppService} from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Get('*')
    @Render('views/index')
    root() {
        return {message: 'sadsdasd world!'};
    }
    
}
