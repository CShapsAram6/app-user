interface voucherDtos {
  id: number;
  name: string;
  timeStart: Date;
  timeEnd: Date;
  discountType: string;
  discount: number;
  min_Order_Value: number;
  maxDiscount: number;
  stock: number;
  status: number;
}

export { voucherDtos };
