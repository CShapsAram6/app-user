interface ICartLocal {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  size: number;
  amount: number;
}

interface ICart {
  id: number;
  name: string;
  quantity: number;
  size: number;
  price: number;
  image: string;
  total: number;
  colors: IColorCart[];
}

interface IColorCart {
  id: number;
  code: string;
  quantity: number;
}
interface ICartRedis {
  accountId: number;
  itemCarts: ICart;
}

interface ICartRedisAfterLogin {
  accountId: number;
  itemCarts: ICart[];
}

interface IChangeQuantity {
  type: string;
  id: number;
  idAccount: number;
  idColor: number;
}

export {
  ICartLocal,
  ICart,
  ICartRedis,
  ICartRedisAfterLogin,
  IChangeQuantity,
  IColorCart,
};
