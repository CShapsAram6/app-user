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
}
interface ICartRedis {
  accountId: number;
  itemCarts: ICart;
}

interface ICartRedisAfterLogin {
  accountId: number;
  itemCarts: ICart[];
}

export { ICartLocal, ICart, ICartRedis, ICartRedisAfterLogin };
