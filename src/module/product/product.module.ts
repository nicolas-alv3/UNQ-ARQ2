import { Module } from '@nestjs/common';
import { CreateProductUseCase } from './application/usecase/create-product-use-case.service';
import { ProductController } from './adapter/controller/product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './adapter/mongo/product.schema';
import { FindAllProductsUseCase } from './application/usecase/find-all-products-use-case.service';
import ProductMongoAdapter from './adapter/mongo/ProductMongoAdapter';
import { UpdateProductUseCase } from './application/usecase/update-product-use-case.service';
import { DeleteProductUseCase } from './application/usecase/delete-product-use-case.service';
import { SearchProductsUseCase } from './application/usecase/search-products-use-case.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
  ],
  controllers: [ProductController],
  providers: [
    CreateProductUseCase,
    {
      provide: 'FindProductsQuery',
      useClass: FindAllProductsUseCase,
    },
    {
      provide: 'SearchProductsQuery',
      useClass: SearchProductsUseCase,
    },
    {
      provide: 'CreateProductCommand',
      useClass: CreateProductUseCase,
    },
    {
      provide: 'UpdateProductCommand',
      useClass: UpdateProductUseCase,
    },
    {
      provide: 'DeleteProductCommand',
      useClass: DeleteProductUseCase,
    },
    {
      provide: 'ProductRepository',
      useClass: ProductMongoAdapter,
    },
    ProductMongoAdapter,
  ],
})
export class ProductModule {}
