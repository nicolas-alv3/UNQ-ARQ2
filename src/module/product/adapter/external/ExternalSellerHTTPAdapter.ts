import { Injectable } from '@nestjs/common';
import { ExternalSellerRepository } from '../../application/port/out/ExternalSellerRepository';
import { HttpService } from '@nestjs/axios';

@Injectable()
export default class ExternalSellerHTTPAdapter
  implements ExternalSellerRepository
{
  private userServerURL = 'http://localhost:3001';
  constructor(private readonly httpService: HttpService) {}

  existSellerById(id: string): Promise<boolean> {
    //return this.httpService.get(this.userServerURL + '/seller/id/' + id);
    return new Promise((resolve) => {
      resolve(true);
    });
  }
}
