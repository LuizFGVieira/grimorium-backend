import bodyParser from 'body-parser';
import { NextFunction, Request, RequestHandler, Response } from 'express';

export class BodyParserInterceptor {
  private readonly bodyParserJson = bodyParser.json({ limit: '50mb' });

  public static create(): RequestHandler {
    const interceptor = new BodyParserInterceptor();
    return (req: Request, res: Response, next: NextFunction): void =>
      interceptor.use(req, res, next);
  }

  public use(req: Request, res: Response, next: NextFunction): void {
    this.bodyParserJson(req, res, next);
  }
}