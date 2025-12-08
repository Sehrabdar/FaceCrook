import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [DatabaseModule, UserModule, AuthModule, PostModule, FilesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
