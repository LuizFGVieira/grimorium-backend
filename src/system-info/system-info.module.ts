import { Module } from '@nestjs/common';
import { DomainModule } from './domain/domain.module';
import { InfraModule } from './infra/infra.module';

@Module({
  imports: [InfraModule, DomainModule],
  exports: [InfraModule, DomainModule],
})
export class SystemInfoModule {}
