import { Module } from '@nestjs/common';
import { LoggerServiceImp } from './logger.service';
import { FileLoggerService } from './fileLogger.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [LoggerServiceImp, FileLoggerService],
  exports: [LoggerServiceImp],
})
export class LoggerModule {}
