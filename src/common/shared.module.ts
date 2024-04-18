import { Module } from '@nestjs/common';
import { MongoDBProvider } from './mongoDB/mongodb.provider';

@Module({
    providers: [MongoDBProvider],
    exports: [MongoDBProvider]
})
export class SharedModule {}
