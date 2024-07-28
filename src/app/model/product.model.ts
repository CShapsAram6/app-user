interface productsDtos {
  id: number;
  name: string;
  image: string;
  category: number;
  price: number;
  size: number;
}

interface singleProductDto {
  id: number;
  category: number;
  name: string;
  description: string;
  images: imageDto[];
  variant: variantDtos[];
  colors: colorDtos[];
  files: fileDtos[];
}

interface colorDtos {
  id: number;
  code: string;
}

interface imageDto {
  id: number;
  link: string;
  isActive: boolean;
}

interface fileDtos {
  id: number;
  productId: number;
  link: string;
  fileName: string;
  fileType: string;
}

interface variantDtos {
  id: number;
  size: number;
  price: number;
  quantity: number;
  status: boolean;
}

export { productsDtos, singleProductDto, variantDtos, colorDtos, fileDtos };
