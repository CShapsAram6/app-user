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
interface UserInfoDTO{
  Id : number;
  UserName: string;
  Email: string;
  Phone: string;
  FullName: string;
  linkAvatar: string;
}

export { ISignInRequest, IUserToken, ISignUp,UserInfoDTO };
