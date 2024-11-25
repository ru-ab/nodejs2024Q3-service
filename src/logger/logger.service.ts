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

  debug?(message: unknown, ...optionalParams: unknown[]) {
    const enableIfLevel = ['debug'];
    if (!enableIfLevel.includes(this.logLevel)) {
      return;
    }

    const messageText = this.createMessageText(
      'DEBUG',
      message,
      optionalParams,
    );
    process.stdout.write(this.colorize('blue', messageText));
    this.fileLogger.debug(messageText);
  }

  verbose(message: unknown, ...optionalParams: unknown[]) {
    const enableIfLevel = ['verbose', 'debug'];
    if (!enableIfLevel.includes(this.logLevel)) {
      return;
    }

    const messageText = this.createMessageText(
      'VERBOSE',
      message,
      optionalParams,
    );
    process.stdout.write(messageText);
    this.fileLogger.verbose(messageText);
  }

  log(message: unknown, ...optionalParams: unknown[]) {
    const enableIfLevel = ['log', 'verbose', 'debug'];
    if (!enableIfLevel.includes(this.logLevel)) {
      return;
    }

    const messageText = this.createMessageText('LOG', message, optionalParams);
    process.stdout.write(this.colorize('green', messageText));
    this.fileLogger.log(messageText);
  }

  warn(message: unknown, ...optionalParams: unknown[]) {
    const enableIfLevel = ['warn', 'log', 'verbose', 'debug'];
    if (!enableIfLevel.includes(this.logLevel)) {
      return;
    }

    const messageText = this.createMessageText('WARN', message, optionalParams);
    process.stdout.write(this.colorize('yellow', messageText));
    this.fileLogger.warn(messageText);
  }

  error(message: unknown, ...optionalParams: unknown[]) {
    const enableIfLevel = ['error', 'warn', 'log', 'verbose', 'debug'];
    if (!enableIfLevel.includes(this.logLevel)) {
      return;
    }

    const messageText = this.createMessageText(
      'ERROR',
      message,
      optionalParams,
    );
    process.stdout.write(this.colorize('red', messageText));
    this.fileLogger.error(messageText);
  }

  private createMessageText(
    logLevel: string,
    message: unknown,
    optionalParams: unknown[],
  ) {
    const now = new Date();
    const timestamp = this.formatDateToString(now);
    return `${timestamp} - [${logLevel}] [${optionalParams[0]}] ${message}\n`;
  }

  private colorize(color: 'red' | 'yellow' | 'green' | 'blue', output: string) {
    const colors = {
      red: '91',
      green: '92',
      yellow: '93',
      blue: '94',
    };

    return ['\x1b[', colors[color], 'm', output, '\x1b[0m'].join('');
  }

  private formatDateToString(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
}
