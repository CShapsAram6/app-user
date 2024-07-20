import { addressModel, addressRequest } from "../model/address.model";

export interface IAddressRepository {
  generateRandomString(length: number): string;
  generateRequest(model : addressModel) : addressRequest;
}
