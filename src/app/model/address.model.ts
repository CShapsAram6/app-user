interface proviceDtos {
  ProvinceID: number;
  NameExtension: string[];
}
interface districtDtos {
  DistrictID: number;
  NameExtension: string[];
}
interface wardDtos {
  WardCode: string;
  NameExtension: string[];
}

interface addressModel {
  id: string;
  address: string;
  fullName: string;
  phone: string;
  idDistrict: string;
  idWard: string;
}
interface addressRequest {
  id: number;
  address: addressModel;
}

interface addressGetById {
  id: string;
  user: number;
}

export {
  addressModel,
  proviceDtos,
  districtDtos,
  wardDtos,
  addressRequest,
  addressGetById,
};
