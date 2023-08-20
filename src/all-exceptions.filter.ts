import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AbstractHttpAdapter } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter<T> implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: AbstractHttpAdapter) {}

  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const httpInfo =
      exception instanceof HttpException
        ? { message: exception.message, code: exception.getStatus() }
        : {
            message: 'Internal server error',
            code: HttpStatus.INTERNAL_SERVER_ERROR,
          };

    const responseBody = {
      statusCode: httpInfo.code,
      message: httpInfo.message,
      timestamp: new Date().toISOString(),
      path: this.httpAdapterHost.getRequestUrl(ctx.getRequest()),
    };

    this.httpAdapterHost.reply(ctx.getResponse(), responseBody, httpInfo.code);
  }
}
