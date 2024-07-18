interface ISignInRequest {
  userName: string;
  password: string;
}
interface IUserToken {
  Email: string;
  Id: string;
}

export { ISignInRequest, IUserToken };
