import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Post,
} from '@nestjs/common';
import GenericMapper from 'src/module/utils/GenericMapper';
import { Seller } from '../../domain/Seller';
import { SellerRestResponseDto } from './dto/SellerRestResponseDto';
import { FindSellersQuery } from '../../application/port/in/FindSellersQuery';
import { CreateSellerCommand } from '../../application/port/in/CreateSellerCommand';
import { SellerRequestDTO } from './dto/SellerRequestDTO';

@Controller('seller')
export class SellerController {
  constructor(
    @Inject('CreateSellerCommand')
    private createSellerCommand: CreateSellerCommand,
    @Inject('FindSellersCommand')
    private findSellersCommand: FindSellersQuery,
    /*@Inject('UpdateSellerCommand')
    private updateSellerCommand: UpdateSellerCommand,*/
  ) {}

  @Get()
  async getAll(): Promise<Seller[]> {
    const response = await this.findSellersCommand.execute();
    return response.map((u) =>
      GenericMapper.toClass<Seller, SellerRestResponseDto>(
        u,
        new SellerRestResponseDto(),
      ),
    );
  }

  @Post()
  async create(@Body() data: SellerRequestDTO): Promise<SellerRestResponseDto> {
    if (!data) {
      throw new BadRequestException('Invalid user data');
    }
    const response = await this.createSellerCommand.execute(
      GenericMapper.toClass<SellerRequestDTO, Seller>(data, new Seller()),
    );
    return GenericMapper.toClass<Seller, SellerRestResponseDto>(
      response,
      new SellerRestResponseDto(),
    );
  }
  /*

  @Put()
  async update(
    @Body() data: Partial<SellerRequestDTO>,
  ): Promise<SellerRestResponseDto> {
    if (!data) {
      throw new BadRequestException('Invalid product data');
    }
    const response = await this.updateSellerCommand.execute(
      GenericMapper.toClass<Partial<SellerRequestDTO>, Seller>(
        data,
        new Seller(),
      ),
    );
    return GenericMapper.toClass<Seller, SellerRestResponseDto>(
      response,
      new SellerRestResponseDto(),
    );
  }*/
}
