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
interface IOrderDetailDto {
  id: number,
  total: number,
  feeDelivery: number,
  discount: number,
  timeCreate: string,
  statusOrder: number,
  statusDelivery: number,
  namePaymentMethod: string,
  couponId: number,
  customerName: string,
  customerEmail: string,
  customerPhone: string,
  customerAddress: string,
  itemOrder: [
    {
      quantity: number,
      productDetail: {
        id: number,
        size: number,
        price: number,
        nameProduct: string,
        imageUrl: string
      }
    }
  ]
}
interface IOrderUserRequest {
  status: string;
  pageSize: number;
}

interface ICancelOrderUserRequest {
  reasonCancelUser: string;
  token: string;
}

export { IOrderRequest, IOrderUserDto, IOrderUserRequest, IOrderDetailDto, ICancelOrderUserRequest };
