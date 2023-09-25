import {
  ConsoleLogger,
  Injectable,
  LoggerService,
  Scope,
} from '@nestjs/common';
import { appendFile } from 'fs/promises';
import { EOL } from 'os';
import { resolve } from 'path';

type Options = {
  readonly id: number;
  readonly bytesWritten: number;
  readonly folderPath: string;
  readonly size: number;
};

@Injectable({ scope: Scope.REQUEST })
export class LoggingService extends ConsoleLogger implements LoggerService {
  private _bytesWritten: number;
  private _logFileId: number;
  private _folderPath: string;
  private _size: number;

  constructor({ id, bytesWritten, folderPath, size }: Options) {
    super();
    this._logFileId = id;
    this._bytesWritten = bytesWritten;
    this._size = size;
    this._folderPath = folderPath;
  }

  log<T>(message: string, context?: T) {
    super.log(message, context);

    const messageWithEOL = message + EOL;
    const messageSize = Buffer.from(messageWithEOL).byteLength;
    const totalSize = messageSize + this._bytesWritten;

    this._bytesWritten += messageSize;

    if (totalSize > this._size) {
      this._logFileId++;
      this._bytesWritten = 0;
    }

    const path = this.createLogFilePath();

    appendFile(path, messageWithEOL);
  }

  private createLogFilePath() {
    return resolve(
      this._folderPath,
      `${this._size}-bytes-log-${this._logFileId}.log`,
    );
  }

  logRequest(url: string, params: string, body: string) {
    const message = `Request: url - ${url}, params - ${params}, body - ${body}`;

    this.log(message);
  }

  logResponse(code: number, body: string) {
    const message = `Response: status code - ${code}, body - ${body}`;

    this.log(message);
  }

  errorResponse(message: string) {
    const errorMessage = `Error response: ${message}`;

    this.error(errorMessage);
  }

  uncaughtExceptionError(name: string, message: string, stack: string) {
    const errorMessage = `Uncaught exception error: name - ${name}, message - ${message}, stack - ${stack} `;

    this.error(errorMessage);
  }

  unhandledRejectionError<T>(reason: T) {
    const message = `Unhandled rejection error: reason - ${reason}`;

    this.error(message);
  }
}
