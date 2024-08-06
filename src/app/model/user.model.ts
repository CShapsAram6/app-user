interface ISignInRequest {
  userName: string;
  password: string;
}
interface IUserToken {
  Email: string;
  Id: string;
}
interface ISignUp {
  username: string;
  name: string;
  email: string;
  phone: string;
  password: string;
}

interface userByEmail {
  picture: string;
  email: string;
  name: string;
}

export { ISignInRequest, IUserToken, ISignUp, userByEmail };
