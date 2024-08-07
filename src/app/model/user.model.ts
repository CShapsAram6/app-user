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
interface UserInfoDTO {
  Id: number;
  UserName: string;
  Email: string;
  Phone: string;
  fullName: string;
  linkAvatar: string;
  address: string;
}

interface userByEmail {
  picture: string;
  email: string;
  name: string;
}

export { ISignInRequest, IUserToken, ISignUp, userByEmail, UserInfoDTO };
