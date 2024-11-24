import { Module } from '@nestjs/common';
import { LoggerServiceImp } from './logger.service';

@Module({
  providers: [LoggerServiceImp],
  exports: [LoggerServiceImp],
})
export class LoggerModule {}
