import { describe, expect, test } from '@jest/globals';
import { Sale } from './sale.entity';
import { Item } from './item.entity';
import { Product } from './product.entity';

describe('Sale price', () => {
  test('with zero items', () => {
    const sale = new Sale([]);
    expect(sale.getPrice()).toBe(0);
  });

  test('with one computer of 10', () => {
    const product = new Product('Computer', 10);
    const item10 = new Item(1, product);
    const sale = new Sale([item10]);
    expect(sale.getPrice()).toBe(10);
  });

  test('with two computers of 10', () => {
    const product = new Product('Computer', 10);
    const item10 = new Item(2, product);
    const sale = new Sale([item10]);
    expect(sale.getPrice()).toBe(20);
  });

  test('with one computer of 10 and one headset of 5', () => {
    const computer = new Product('Computer', 10);
    const headset = new Product('Headset', 5);
    const computerItem = new Item(1, computer);
    const headsetItem = new Item(1, headset);
    const sale = new Sale([computerItem, headsetItem]);
    expect(sale.getPrice()).toBe(15);
  });

  test('with one computer the stock decreases in one', () => {
    const computer = new Product('Computer', 10, '', 'no', 20);
    const computerItem = new Item(1, computer);
    const sale = new Sale([computerItem]);
    sale.process();
    expect(computerItem.getProduct().getStock()).toBe(19);
  });
});
