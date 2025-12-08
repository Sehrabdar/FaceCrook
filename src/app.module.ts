import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { DatabaseModule } from './database/database.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { LoggerModule } from './logger/logger.module';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { FilesModule } from './files/files.module';
import { PoliciesModule } from './policies/policies.module';
import { PoliciesGuard } from './policies/policies.guard';

@Module({
  imports: [PoliciesModule, DatabaseModule, LoggerModule, UserModule, AuthModule, PostModule, FilesModule],
  controllers: [AppController],
  providers: [AppService, {provide: APP_GUARD, useClass: PoliciesGuard}],
})
export class AppModule {}
