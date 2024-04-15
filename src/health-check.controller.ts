import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller()
export class HealthCheckController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  getHello() {
    const nodeEnv = this.configService.get<string>('NODE_ENV');
    const appPort = this.configService.get<string>('APP_PORT');
    return {
      data: 'ok',
      enviroment: nodeEnv,
      port: appPort,
    };
  }
}
