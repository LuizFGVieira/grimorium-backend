import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    const metadata = {
      timestamp: new Date().getTime(),
      controller: context.getClass().name,
      request: {
        url: request.url,
        hostname: request.hostname,
        body: request.body,
        query: request.query,
      },
    };
    this.logger.log(metadata);
    return next.handle();
  }
}
