import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';

@Module({
  imports: [
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike('Facecrook', {
              prettyPrint: true,
            }),
          ),
        }),
        new winston.transports.File({
          dirname: 'logs',
          filename: 'combined.log',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
          ),
        }),
        new winston.transports.File({
          dirname: 'logs',
          filename: 'error.log',
          level: 'error',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
          ),
        }),
      ],
    }),
  ],
  exports: [WinstonModule],
})
export class LoggerModule {}
