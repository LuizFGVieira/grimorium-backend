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
    const requestBody = this.maskSensitiveFields({...request.body});
    const metadata = {
      timestamp: new Date().getTime(),
      controller: context.getClass().name,
      request: {
        url: request.url,
        hostname: request.hostname,
        body: requestBody,
        query: request.query,
      },
    };
    this.logger.log(metadata);
    return next.handle();
  }

  private maskSensitiveFields(body: any): any {
    if (body.image) {
      body.image = this.maskField('toolong');
    }
    if (body.password) {
      body.password = this.maskField('sensitive');
    }
    return body;
  }

  private maskField(type: string): string {
    switch(type) {
      case 'sensitive': 
        return '<sensitive content>';
      case 'toolong':
        return '<too long content>';
      default:
        return '<masked content>';
    }
  }
}
