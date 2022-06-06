import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth/auth.controller';
import { UserService } from "./user/user.service";
import { User, UserSchema } from "./schemas/user.schema";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { VoiceModule } from './voice/voice.module';
import { VoiceGateway } from './voice/voice.gateway';
// import { ServeStaticModule } from '@nestjs/serve-static';
// import { join } from 'path';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (config: ConfigService) => ({
                uri: config.get('MONGODB_STRING'),
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }),
            inject: [ConfigService],
        }),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        VoiceModule,
        // ServeStaticModule.forRoot({
        //     rootPath: join(__dirname, '..', 'public'),
        // }),
    ],
    controllers: [AppController, AuthController],
    providers: [AppService, UserService, VoiceGateway],
})
export class AppModule {
}
