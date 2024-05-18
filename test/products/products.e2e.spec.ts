import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { ProductModule } from '../../src/module/product/product.module';
import { Connection } from 'mongoose';
import { getConnectionToken } from '@nestjs/mongoose';
import axios from 'axios';

const clearDatabase = async (connection) => {
  const collections = connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};

describe('Products integration tests (e2e)', () => {
  let app: INestApplication;
  let connection: Connection;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, ProductModule],
    }).compile();
    connection = await moduleFixture.get(getConnectionToken());

    app = moduleFixture.createNestApplication();
    await app.init();
    await clearDatabase(connection);
  });

  afterAll(() => {
    app.close();
  });

  it('(GET) /products  works', () => {
    return request(app.getHttpServer())
      .get('/products')
      .expect(200)
      .expect(({ body }) => {
        expect(body).toEqual([]);
      })
      .then((r) => console.log(r.body));
  });

  async function createAuxSeller() {
    // Crear un vendedor en la aplicación externa
    const sellerData = {
      email: 'test@mail.com',
      businessName: 'test',
    };

    const response = await axios.post(
      'http://localhost:8080/sellers',
      sellerData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data.id;
  }

  it('should create a product', async () => {
    const sellerId = await createAuxSeller();
    const productData = {
      name: 'Celular 3',
      price: 2000,
      description: 'A mock description',
      category: 'tecnologia',
      stock: 20,
      sellerId,
    };

    const response = await request(app.getHttpServer())
      .post('/products')
      .send(productData)
      .set('Content-Type', 'application/json')
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(productData.name);
    expect(response.body.price).toBe(productData.price);
    expect(response.body.description).toBe(productData.description);
    expect(response.body.category).toBe(productData.category);
    expect(response.body.stock).toBe(productData.stock);
    expect(response.body.sellerId).toBe(productData.sellerId);
  });

  it('should return an error when sellerId is incorrect', async () => {
    const incorrectSellerId = 'incorrectSellerId';
    const productData = {
      name: 'Celular 3',
      price: 2000,
      description: 'A mock description',
      category: 'tecnologia',
      stock: 20,
      sellerId: incorrectSellerId,
    };

    const response = await request(app.getHttpServer())
      .post('/products')
      .send(productData)
      .set('Content-Type', 'application/json')
      .expect(400);

    expect(response.body).toHaveProperty('statusCode', 400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toContain('Bad Request');
  });
});
