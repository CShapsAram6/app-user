interface vietNameseDtos {
  Code: string;
  CodeName: string;
  FullName: string;
  FullNameEn: string;
  Name: string;
  NameEn: string;
}

type addressModel = {
  address: string;
  fullName: string;
  phone: string;
};
export { vietNameseDtos, addressModel };
