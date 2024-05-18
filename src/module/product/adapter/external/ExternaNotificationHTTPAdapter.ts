import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { NotificationDomainService } from '../../application/port/out/NotificationDomainService';
import { SaleRecord } from '../../domain/sale-record';
import { UserData } from '../../application/port/out/ExternalUserRepository';
import { Observable } from 'rxjs';

@Injectable()
export default class ExternalNotificationHTTPAdapter
  implements NotificationDomainService
{
  private userServerURL = 'http://localhost:3001';
  constructor(private readonly httpService: HttpService) {}

  sendSaleNotification(sale: SaleRecord, user: UserData): Observable<any> {
    const body = {
      user,
      sale,
    };
    return this.httpService.post(this.userServerURL + '/notification', body);
  }
}
