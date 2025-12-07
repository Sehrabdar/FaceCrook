import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
