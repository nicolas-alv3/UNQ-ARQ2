import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './module/product/product.module';
import * as process from 'process';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        uri: process.env.DB_CONNECTION,
        dbName: config.get('NODE_ENV') === 'test' ? 'test2' : 'test',
        autoIndex: false,
      }),
    }),
    ProductModule,
    //UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
