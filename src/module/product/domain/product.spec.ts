import { describe, expect, test } from '@jest/globals';
import { Product } from './product.entity';

describe('Product', () => {
  test(' new products starts with zero stock', () => {
    const product = new Product();
    expect(product.getStock()).toBe(0);
  });
});
