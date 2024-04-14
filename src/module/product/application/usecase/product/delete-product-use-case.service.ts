import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from '../../port/out/ProductRepository';
import { DeleteProductCommand } from '../../port/in/DeleteProductCommand';

@Injectable()
export class DeleteProductUseCase implements DeleteProductCommand {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
  ) {}

  execute(id: string): Promise<boolean> {
    return this.productRepository.delete(id);
  }
}
