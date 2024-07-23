interface IOrderRequest {
  voucherId: number,
  feeDelivery: number,
  paymentMethodId: number,
  addressDelivery: string,
  phoneDelivery: string,
  noteDelivery: string,
  orderItems: { idProduct: number; size: number; quantity: number; }[];
}


export { IOrderRequest };
