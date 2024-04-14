import { Test, TestingModule } from '@nestjs/testing';
import { CreateProductUseCase } from './create-product-use-case.service';

describe('ProductService', () => {
  let service: CreateProductUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateProductUseCase],
    }).compile();

    service = module.get<CreateProductUseCase>(CreateProductUseCase);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
