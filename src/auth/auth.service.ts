import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string): Promise<any>{
    const user = await this.userService.findOneByEmail(email);
    if(user && await bcrypt.compare(password, user.password)){
      const {password, ...result} = user;
      return result;
    }
    return null;
  }
  async login(user: any) { 
  console.log('🔍 FULL LOGIN USER:', user);
  
  const payload = { 
    sub: user.id,
    email: user.email 
  };
  
  return {
    access_token: this.jwtService.sign(payload),
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar
    }
  };
}
}
