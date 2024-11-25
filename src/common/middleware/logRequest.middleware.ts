import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';

@Injectable()
export class LogRequestMiddleware implements NestMiddleware {
  logger = new Logger('LogRequestMiddleware');

  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      const message = createLogMessage(req, res);
      this.logger.log(message);
    });

    next();
  }
}

function createLogMessage(req: Request, res: Response) {
  const { method, originalUrl, query, body } = req;
  const { statusCode } = res;
  const urlString = `url=${originalUrl}`;
  const queryString = `query=${JSON.stringify(query)}`;
  const bodyString = `body=${JSON.stringify(body)}`;
  const statusCodeString = `statusCode=${statusCode}`;

  return `${method} ${urlString} ${queryString} ${bodyString} ${statusCodeString}`;
}
