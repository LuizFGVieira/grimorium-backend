import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthCheckController {
  constructor() {}

  @Get()
  getHello(): Object {
    return {data: 'ok'};
  }
}
