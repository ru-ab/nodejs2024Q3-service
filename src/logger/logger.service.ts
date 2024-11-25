import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class LoggerServiceImp implements LoggerService {
  log(message: any, ...optionalParams: any[]) {
    process.stdout.write(
      colorize('green', `[${optionalParams[0]}] ${message}\n`),
    );
  }

  error(message: any, ...optionalParams: any[]) {
    process.stdout.write(
      colorize('red', `[${optionalParams[0]}] ${message}\n`),
    );
  }

  warn(message: any, ...optionalParams: any[]) {
    process.stdout.write(
      colorize('yellow', `[${optionalParams[0]}] ${message}\n`),
    );
  }

  debug?(message: any, ...optionalParams: any[]) {
    process.stdout.write(`[${optionalParams[0]}] ${message}\n`);
  }
}

function colorize(color: 'red' | 'yellow' | 'green', output: string) {
  const colors = {
    red: '91',
    green: '92',
    yellow: '93',
  };

  return ['\x1b[', colors[color], 'm', output, '\x1b[0m'].join('');
}
