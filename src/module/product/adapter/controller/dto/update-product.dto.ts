import { PartialType } from '@nestjs/mapped-types';
import { ProductRequestDto } from './REST-request/product-request.dto';

export class UpdateProductDto extends PartialType(ProductRequestDto) {}
