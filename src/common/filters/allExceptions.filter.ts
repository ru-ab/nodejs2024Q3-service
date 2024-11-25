import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  logger = new Logger('LogRequestMiddleware');

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const errorResponse =
      exception instanceof HttpException
        ? { statusCode: exception.getStatus(), message: exception.message }
        : {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Internal server error',
          };

    const responseBody = {
      ...errorResponse,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    this.logger.error(
      `Error occurred: ${
        exception instanceof Error ? exception.message : errorResponse.message
      }`,
    );

    response.status(errorResponse.statusCode).json(responseBody);
  }
}
