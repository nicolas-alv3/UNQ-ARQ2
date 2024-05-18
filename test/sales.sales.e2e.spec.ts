import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Connection } from 'mongoose';
import { TestService } from './test.service';
import { getConnectionToken } from '@nestjs/mongoose';

describe('SalesController (e2e)', () => {
  let app: INestApplication;
  let connection: Connection;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    connection = await moduleFixture.get(getConnectionToken());

    app = moduleFixture.createNestApplication();
    await app.init();
    await TestService.clearDatabase(connection);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a sale', async () => {
    const sellerId = await TestService.createAuxSeller();
    const productId = await TestService.createAuxProduct(
      sellerId,
      app.getHttpServer(),
    );
    const userId = await TestService.createAuxUser();

    const saleData = {
      userId,
      items: [
        {
          amount: 3,
          productId,
        },
      ],
    };

    const response = await request(app.getHttpServer())
      .post('/api/v1/sale')
      .send(saleData)
      .set('Content-Type', 'application/json')
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.userId).toBe(saleData.userId);
    expect(response.body.items).toHaveLength(1);
    expect(response.body.items[0].amount).toBe(saleData.items[0].amount);
    expect(response.body.items[0].productId).toBe(saleData.items[0].productId);
  });
});
