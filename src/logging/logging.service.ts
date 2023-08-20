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
}
