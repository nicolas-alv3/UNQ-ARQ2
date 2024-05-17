import { SaleRecord } from '../../../domain/sale-record';
import { UserData } from './ExternalUserRepository';
import { Observable } from 'rxjs';

export interface NotificationDomainService {
  sendSaleNotification(
    sale: SaleRecord,
    userData: UserData,
  ): Observable<boolean>;
}
