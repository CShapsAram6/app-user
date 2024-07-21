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

interface ItemGHN {
  name: string;
  quantity: number;
}
interface RequestGHN {
  service_type_id: number;
  from_district_id: number;
  to_district_id: number;
  to_ward_code: string;
  weight: number;
  items: ItemGHN[];
}

interface responseGHN {
  service_fee: number;
  total: number;
}
export {
  requestServiceDelivery,
  responseServiceDelivery,
  RequestGHN,
  ItemGHN,
  responseGHN,
};
