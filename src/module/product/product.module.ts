import { Module } from '@nestjs/common';
import { CreateProductUseCase } from './application/usecase/create-product-use-case.service';
import { ProductController } from './adapter/controller/product.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {ProductSchema} from "./adapter/db/product.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: "Product", schema: ProductSchema }])],
  controllers: [ProductController],
  providers: [CreateProductUseCase],
})
export class ProductModule {}
