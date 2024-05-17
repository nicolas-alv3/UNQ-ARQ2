import { Injectable } from '@nestjs/common';
import { ExternalSellerRepository } from '../../application/port/out/ExternalSellerRepository';
import { HttpService } from '@nestjs/axios';
import {
  ExternalUserRepository,
  UserData,
} from '../../application/port/out/ExternalUserRepository';

@Injectable()
export default class ExternalUserHTTPAdapter implements ExternalUserRepository {
  private userServerURL = 'http://localhost:3001';
  constructor(private readonly httpService: HttpService) {}

  getUserById(id: string): Promise<UserData> {
    //return this.httpService.get(this.userServerURL + '/seller/id/' + id);
    return new Promise((resolve) => {
      resolve({
        name: 'John Doe',
        email: 'nicolas.alv3@gmail.com',
      });
    });
  }
}
