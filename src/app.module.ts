import { Module } from '@nestjs/common';
import { HealthCheckController } from './health-check.controller';
import { SheetManagerModule } from './sheet-manager/sheet-manger.module';

@Module({
  imports: [SheetManagerModule],
  controllers: [HealthCheckController],
})
export class AppModule {}
