import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LoggingService } from 'src/logging/logging.service';
import { inspect } from 'util';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private logger: LoggingService) {
    this.logger.setContext(LoggingService.name);
  }
  use(req: Request, res: Response, next: NextFunction) {
    const { url, params, body } = req;

    const strinfiyedParams = inspect(params);
    const strinfiyedBody = inspect(body);
    this.logger.logRequest(url, strinfiyedParams, strinfiyedBody);

    const bindedSend = res.send.bind(res);

    res.send = (body) => {
      const stringifyedBody = inspect(body);
      this.logger.logResponse(res.statusCode, stringifyedBody);
      return bindedSend(body);
    };

    next();
  }
}
