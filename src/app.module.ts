import { Module } from '@nestjs/common';
import { HealthCheckController } from './health-check.controller';
import { SheetManagerModule } from './sheet-manager/sheet-manger.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    SheetManagerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      ignoreEnvFile: false,
    }),
  ],
  controllers: [HealthCheckController],
})
export class AppModule {}
