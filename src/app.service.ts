import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  getHello(): string {
    this.logger.log('🚀 Facecrook server is running!');
    return 'Hello Facecrook! Social media backend LIVE! 🔥';
  }
}
