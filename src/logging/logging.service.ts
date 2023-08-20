import {
  ConsoleLogger,
  Injectable,
  LoggerService,
  Scope,
} from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggingService extends ConsoleLogger implements LoggerService {
  logRequest(url: string, params: string, body: string) {
    this.log(`Request: url - ${url}, params - ${params}, body - ${body}`);
  }

  logResponse(code: number, body: string) {
    this.log(`Response: status code - ${code}, body - ${body}`);
  }

  errorResponse(message: string) {
    this.error(`Error response: ${message}`);
  }

  uncaughtExceptionError(name: string, message: string, stack: string) {
    this.error(
      `Uncaught exception error: name - ${name}, message - ${message}, stack - ${stack} `,
    );
  }

  unhandledRejectionError<T>(reason: T) {
    this.error(`Unhandled rejection error: reason - ${reason}`);
  }
}
