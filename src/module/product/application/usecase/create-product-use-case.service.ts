import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '../../adapter/controller/dto/create-product.dto';
import { UpdateProductDto } from '../../adapter/controller/dto/update-product.dto';
import {InjectModel} from "@nestjs/mongoose";
import {Product} from "../../domain/product.entity";
import {Model} from "mongoose";
import {CreateProductCommand} from "../port/in/CreateProductCommand";

@Injectable()
export class CreateProductUseCase implements CreateProductCommand {
  constructor(@InjectModel(Product.name) private readonly productModel: Model<Product>) {
  }
  create(createProductDto: CreateProductDto) {
    return this.productModel.create(createProductDto);
  }

  findAll() {
    return this.productModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
