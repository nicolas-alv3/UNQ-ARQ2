import { Module } from '@nestjs/common';
import { CreateProductUseCase } from './application/usecase/product/create-product-use-case.service';
import { ProductController } from './adapter/controller/product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './adapter/mongo/product.schema';
import { FindAllProductsUseCase } from './application/usecase/product/find-all-products-use-case.service';
import ProductMongoAdapter from './adapter/mongo/ProductMongoAdapter';
import { UpdateProductUseCase } from './application/usecase/product/update-product-use-case.service';
import { DeleteProductUseCase } from './application/usecase/product/delete-product-use-case.service';
import { SearchProductsUseCase } from './application/usecase/product/search-products-use-case.service';
import { SaleController } from './adapter/controller/sale.controller';
import { ProcessSaleUseCase } from './application/usecase/sale/process-sale-usecase.service';
import SaleMongoAdapter from './adapter/mongo/SaleMongoAdapter';
import { SaleSchema } from './adapter/mongo/sale.schema';
import { HttpModule } from '@nestjs/axios';
import ExternalSellerHTTPAdapter from './adapter/external/ExternalSellerHTTPAdapter';
import ExternalUserHTTPAdapter from './adapter/external/ExternalUserHTTPAdapter';
import ExternalNotificationHTTPAdapter from './adapter/external/ExternaNotificationHTTPAdapter';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: 'Sale', schema: SaleSchema }]),
    HttpModule,
  ],
  controllers: [ProductController, SaleController],
  providers: [
    {
      provide: 'ProcessSaleCommand',
      useClass: ProcessSaleUseCase,
    },
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
    {
      provide: 'SaleRepository',
      useClass: SaleMongoAdapter,
    },
    {
      provide: 'ExternalSellerRepository',
      useClass: ExternalSellerHTTPAdapter,
    },
    {
      provide: 'ExternalUserRepository',
      useClass: ExternalUserHTTPAdapter,
    },
    {
      provide: 'NotificationDomainService',
      useClass: ExternalNotificationHTTPAdapter,
    },
    ProductMongoAdapter,
  ],
})
export class ProductModule {}
