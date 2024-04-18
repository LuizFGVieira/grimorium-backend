import { Module } from '@nestjs/common';
import { InfraModule } from './infra/infra.module';
import { DomainModule } from './domain/domain.module';
import { AccountsModule } from 'src/accounts/accounts.module';

@Module({
  imports: [InfraModule, DomainModule, AccountsModule],
  exports: [InfraModule, DomainModule],
})
export class SheetManagerModule {}
