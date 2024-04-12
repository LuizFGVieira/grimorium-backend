import { Module } from '@nestjs/common';

const services = [];

@Module({
  imports: [...services],
  exports: [...services],
})
export class InfraModule {}
