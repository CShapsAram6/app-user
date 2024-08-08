interface voucherDtos {
  id: number;
  name: string;
  timeStart: Date;
  timeEnd: Date;
  discountType: string;
  discount: number;
  min_Order_Value: number;
  max_Discount: number;
  stock: number;
  status: number;
}

export { voucherDtos };
