import { Injectable } from '@nestjs/common';
import { ExternalSellerRepository } from '../../application/port/out/ExternalSellerRepository';
import { HttpService } from '@nestjs/axios';

@Injectable()
export default class ExternalSellerHTTPAdapter
  implements ExternalSellerRepository
{
  private userServerURL = 'http://localhost:8080';
  constructor(private readonly httpService: HttpService) {}

  existSellerById(id: string): Promise<boolean> {
    return this.httpService
      .get(this.userServerURL + '/sellers/' + id)
      .toPromise()
      .then((res) => {
        return !!res.data;
      });
  }
}
