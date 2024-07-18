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
}

interface imageDto {
  id: number;
  link: string;
  isActive: boolean;
}

interface variantDtos {
  id: number;
  size: number;
  price: number;
  quantity: number;
  status: boolean;
}

export { productsDtos, singleProductDto, variantDtos };
