import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import {MongooseModule} from "@nestjs/mongoose";
import { ProductModule } from './module/product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot(), MongooseModule.forRoot(process.env.DB_CONNECTION as string), ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
