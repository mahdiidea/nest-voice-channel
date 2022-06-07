import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth/auth.controller';
import { User, UserSchema } from './user/user.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { VoiceGateway } from './voice/voice.gateway';

import { UserEmailValidation } from './user/user.email.validation';

import { AppService } from './app.service';
import { VoiceModule } from './voice/voice.module';
import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

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
    UserModule,
    AuthModule
    ],
  controllers: [AppController, AuthController],
  providers: [AppService, UserService, AuthService, VoiceGateway, UserEmailValidation],
})
export class AppModule { }
