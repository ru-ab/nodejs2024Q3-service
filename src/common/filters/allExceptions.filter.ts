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
      createLogMessage(
        request,
        errorResponse.statusCode,
        errorResponse.message,
      ),
    );

    response.status(errorResponse.statusCode).json(responseBody);
  }
}

function createLogMessage(
  req: Request,
  statusCode: number,
  errorMessage: string,
) {
  const { method, originalUrl, query, body } = req;
  const urlString = `url=${originalUrl}`;
  const queryString = `query=${JSON.stringify(query)}`;
  const bodyString = `body=${JSON.stringify(body)}`;
  const statusCodeString = `statusCode=${statusCode}`;
  const errorMessageString = `errorMessage=${errorMessage}`;

  return `${method} ${urlString} ${queryString} ${bodyString} ${statusCodeString} ${errorMessageString}`;
}
