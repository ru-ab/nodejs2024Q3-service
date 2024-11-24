import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class LoggerServiceImp implements LoggerService {
  log(message: any, ...optionalParams: any[]) {
    console.log(`[${optionalParams[0]}] ${message}`);
  }

  error(message: any, ...optionalParams: any[]) {
    console.error(`[${optionalParams[0]}] ${message}`);
  }

  warn(message: any, ...optionalParams: any[]) {
    console.warn(`[${optionalParams[0]}] ${message}`);
  }

  debug?(message: any, ...optionalParams: any[]) {
    console.debug(`[${optionalParams[0]}] ${message}`);
  }
}
