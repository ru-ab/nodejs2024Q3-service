import { Injectable, LoggerService } from '@nestjs/common';
import { FileLoggerService } from './fileLogger.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LoggerServiceImp implements LoggerService {
  private logLevel: 'log' | 'error' | 'warn' | 'debug' | 'verbose';

  constructor(
    private readonly configService: ConfigService,
    private readonly fileLogger: FileLoggerService,
  ) {
    const logLevels = ['error', 'warn', 'log', 'verbose', 'debug'];
    this.logLevel = this.configService.getOrThrow('LOG_LEVEL');
    if (!logLevels.includes(this.logLevel)) {
      throw new Error(
        `LOG_LEVEL environment variable must have one of the following values: ${JSON.stringify(
          logLevels,
        )}`,
      );
    }
  }

  debug?(message: any, ...optionalParams: any[]) {
    const enableIfLevel = ['debug'];
    if (!enableIfLevel.includes(this.logLevel)) {
      return;
    }

    const messageText = `[DEBUG] [${optionalParams[0]}] ${message}\n`;
    process.stdout.write(colorize('blue', messageText));
    this.fileLogger.debug(messageText);
  }

  verbose(message: any, ...optionalParams: any[]) {
    const enableIfLevel = ['verbose', 'debug'];
    if (!enableIfLevel.includes(this.logLevel)) {
      return;
    }

    const messageText = `[VERBOSE] [${optionalParams[0]}] ${message}\n`;
    process.stdout.write(messageText);
    this.fileLogger.verbose(messageText);
  }

  log(message: any, ...optionalParams: any[]) {
    const enableIfLevel = ['log', 'verbose', 'debug'];
    if (!enableIfLevel.includes(this.logLevel)) {
      return;
    }

    const messageText = `[LOG] [${optionalParams[0]}] ${message}\n`;
    process.stdout.write(colorize('green', messageText));
    this.fileLogger.log(messageText);
  }

  warn(message: any, ...optionalParams: any[]) {
    const enableIfLevel = ['warn', 'log', 'verbose', 'debug'];
    if (!enableIfLevel.includes(this.logLevel)) {
      return;
    }

    const messageText = `[WARN] [${optionalParams[0]}] ${message}\n`;
    process.stdout.write(colorize('yellow', messageText));
    this.fileLogger.warn(messageText);
  }

  error(message: any, ...optionalParams: any[]) {
    const enableIfLevel = ['error', 'warn', 'log', 'verbose', 'debug'];
    if (!enableIfLevel.includes(this.logLevel)) {
      return;
    }

    const messageText = `[ERROR] [${optionalParams[0]}] ${message}\n`;
    process.stdout.write(colorize('red', messageText));
    this.fileLogger.error(messageText);
  }
}

function colorize(color: 'red' | 'yellow' | 'green' | 'blue', output: string) {
  const colors = {
    red: '91',
    green: '92',
    yellow: '93',
    blue: '94',
  };

  return ['\x1b[', colors[color], 'm', output, '\x1b[0m'].join('');
}
