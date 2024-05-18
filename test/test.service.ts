import axios from 'axios';
import * as request from 'supertest';

export class TestService {
  static async clearDatabase(connection) {
    const collections = connection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  }
  static async createAuxSeller(): Promise<string> {
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

  static async createAuxProduct(sellerId: string, httpServer) {
    const productData = {
      name: 'Celular 3',
      price: 2000,
      description: 'A mock description',
      category: 'tecnologia',
      stock: 20,
      sellerId,
    };

    const response = await request(httpServer)
      .post('/products')
      .send(productData)
      .set('Content-Type', 'application/json')
      .expect(201);

    return response.body.id;
  }

  static async createAuxUser(): Promise<string> {
    const user = {
      email: 'test@mail.com',
      firstName: 'test',
      lastName: 'test',
    };

    const response = await axios.post('http://localhost:8080/users', user, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data.id;
  }
}
