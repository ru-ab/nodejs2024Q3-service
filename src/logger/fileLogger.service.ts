import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Stats } from 'node:fs';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';

const DEFAULT_LOG_MAX_FILE_SIZE = 1024 * 1024;

@Injectable()
export class FileLoggerService {
  private logsFolderPath: string;
  private appLogFileName: string;
  private errorsLogFileName: string;
  private maxFileSizeInKB: number;

  constructor(private readonly configService: ConfigService) {
    this.logsFolderPath = path.join(__dirname, '..', '..', 'logs');
    this.appLogFileName = 'app.log';
    this.errorsLogFileName = 'errors.log';

    const maxFileSize = parseInt(
      this.configService.getOrThrow<string>('LOG_MAX_FILE_SIZE'),
    );

    this.maxFileSizeInKB = Number.isInteger(maxFileSize)
      ? maxFileSize * 1024
      : DEFAULT_LOG_MAX_FILE_SIZE;

    fs.mkdir(this.logsFolderPath, { recursive: true });
  }

  async debug(message: string) {
    await this.write(this.appLogFileName, message);
  }

  async verbose(message: string) {
    await this.write(this.appLogFileName, message);
  }

  async log(message: string) {
    await this.write(this.appLogFileName, message);
  }

  async warn(message: string) {
    await this.write(this.appLogFileName, message);
  }

  async error(message: string) {
    await this.write(this.appLogFileName, message);
    await this.write(this.errorsLogFileName, message);
  }

  private async write(fileName: string, content: string) {
    try {
      const filePath = path.join(this.logsFolderPath, fileName);
      await this.rotateLog(fileName);
      await fs.appendFile(filePath, content, { flag: 'a+' });
    } catch (err) {
      if (err instanceof Error) {
        console.log(`Could not write to log file: ${err.message}`);
      }
    }
  }

  private async rotateLog(fileName: string) {
    try {
      const filePath = path.join(this.logsFolderPath, fileName);
      const stats: Stats | null = await fs.stat(filePath).catch(() => null);
      if (stats && stats.size >= this.maxFileSizeInKB) {
        await this.rotateLogFile(fileName);
      }
    } catch {}
  }

  private async rotateLogFile(fileName: string) {
    try {
      const now = new Date();
      const dateString = this.formatDateToString(now);
      const rotatedFileName = `${fileName}.${dateString}`;
      const rotatedFilePath = path.join(this.logsFolderPath, rotatedFileName);
      const originalFilePath = path.join(this.logsFolderPath, fileName);

      await fs.rename(originalFilePath, rotatedFilePath);
    } catch {}
  }

  private formatDateToString(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day}_${hours}:${minutes}:${seconds}`;
  }
}
