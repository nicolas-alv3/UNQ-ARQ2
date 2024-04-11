import { CreateProductDto } from '../../../adapter/controller/dto/create-product.dto';
import { HydratedDocument } from 'mongoose';
import { Product } from '../../../domain/product.entity';

export interface CreateProductCommand {
  create: (body: CreateProductDto) => Promise<HydratedDocument<Product>>;
}
