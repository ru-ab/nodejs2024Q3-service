import { Injectable } from '@nestjs/common';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';

@Injectable()
export class FileLoggerService {
  private appLogPath: string;
  private errorsLogPath: string;

  constructor() {
    const logsFolderPath = path.join(__dirname, '..', '..', 'logs');
    this.appLogPath = path.join(logsFolderPath, 'app.log');
    this.errorsLogPath = path.join(logsFolderPath, 'errors.log');

    fs.mkdir(logsFolderPath, { recursive: true });
  }

  async debug(message: string) {
    await this.write(this.appLogPath, message);
  }

  async verbose(message: string) {
    await this.write(this.appLogPath, message);
  }

  async log(message: string) {
    await this.write(this.appLogPath, message);
  }

  async warn(message: string) {
    await this.write(this.appLogPath, message);
  }

  async error(message: string) {
    await this.write(this.appLogPath, message);
    await this.write(this.errorsLogPath, message);
  }

  private async write(filePath: string, content: string) {
    try {
      await fs.appendFile(filePath, content, { flag: 'a+' });
    } catch (err) {
      if (err instanceof Error) {
        console.log(`Could not write to log file: ${err.message}`);
      }
    }
  }
}
