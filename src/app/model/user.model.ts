interface ISignInRequest {
  userName: string;
  password: string;
}
interface IUserToken {
  Email: string;
  Id: string;
}
interface ISignUp{
  username:string;
  name:string;
  email:string;
  phone:string;
  password:string;
}

export { ISignInRequest, IUserToken, ISignUp };
