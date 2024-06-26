import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  private readonly logger = new Logger(ResponseInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse();
    return next.handle().pipe(
      map((data) => {
        const metadata = {
          timestamp: new Date().getTime(),
          Controller: context.getClass().name,
          response: {
            url: response.url,
            hostname: response.hostname,
            status: response.statusCode,
            body: data,
          },
        };
        this.logger.log(metadata);
        return data;
      }),
    );
  }
}
