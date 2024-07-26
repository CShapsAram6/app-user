interface IOrderRequest {
  voucherId: number,
  feeDelivery: number,
  paymentMethodId: number,
  addressDelivery: string,
  phoneDelivery: string,
  noteDelivery: string,
  orderItems: { idProduct: number; size: number; quantity: number; }[];
}

interface IOrderUserDto {
  id: number;
  total: number;
  statusOrder: number;
  statusDelivery: number;
  timeCreate: string;
  itemOrders: [
    {
      quantity: number;
      productDetail: {
        id: number;
        size: number;
        price: number;
        nameProduct: string;
        imageUrl: string;
      }
    }
  ]
}

interface IOrderUserRequest {
  status: string;
  pageSize: number;
}


export { IOrderRequest, IOrderUserDto, IOrderUserRequest };
