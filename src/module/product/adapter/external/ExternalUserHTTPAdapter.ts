import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import {
  ExternalUserRepository,
  UserData,
} from '../../application/port/out/ExternalUserRepository';

@Injectable()
export default class ExternalUserHTTPAdapter implements ExternalUserRepository {
  private userServerURL = 'http://localhost:8080';
  constructor(private readonly httpService: HttpService) {}

  getUserById(id: string): Promise<UserData> {
    return this.httpService
      .get(this.userServerURL + '/users/' + id)
      .toPromise()
      .then((res) => {
        return res.data as UserData;
      });
  }
}
