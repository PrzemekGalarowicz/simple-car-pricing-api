import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor,
    },
  ],
})
export class UsersModule {}
