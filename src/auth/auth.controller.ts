import { 
  Controller, 
  Post, 
  UseGuards, 
  Request
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local.auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: any) { 
    console.log('🔍 req.user:', req.user);
    return this.authService.login(req.user);
  }
}
