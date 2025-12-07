import { ExtractJwt } from 'passport-jwt';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
