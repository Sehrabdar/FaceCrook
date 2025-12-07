import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt-auth/jwt-auth.guard';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions:{expiresIn: '24h'},
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard, LocalStrategy, JwtStrategy],
  exports: [JwtAuthGuard, AuthService],
})
export class AuthModule {}