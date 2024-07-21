import { Observable } from 'rxjs';
import {
  RequestGHN,
  requestServiceDelivery,
  responseServiceDelivery,
} from '../model/serviceDelivery.model';

export interface IServiceOrder {
  mapToRequest(to_id: number): requestServiceDelivery;
  convertRequestGHN(
    district_id: number,
    ward_id: string
  ): Observable<RequestGHN>;
}
