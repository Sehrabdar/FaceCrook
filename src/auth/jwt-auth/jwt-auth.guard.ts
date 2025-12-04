import { ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class JwtAuthGuard extends PassportStrategy(Strategy) {
  constructor(){
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET ?? "",
    });
  }
  async validate(payload: any){
    return {userId: payload.sub, email: payload.email};
  }
}
