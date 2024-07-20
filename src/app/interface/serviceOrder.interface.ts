import {
  requestServiceDelivery,
  responseServiceDelivery,
} from '../model/serviceDelivery.model';

export interface IServiceOrder {
  mapToRequest(to_id: number): requestServiceDelivery;
}
