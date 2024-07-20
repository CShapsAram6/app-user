interface requestServiceDelivery {
  shop_id: number;
  from_district: number;
  to_district: number;
}

interface responseServiceDelivery {
  service_id: number;
  short_name: string;
  service_type_id: number;
}

export { requestServiceDelivery, responseServiceDelivery };
