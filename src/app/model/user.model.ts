interface ISignInRequest {
  userName: string;
  password: string;
}

class auth {
  static handleLogin(response: any): ISignInRequest {
    return {
      userName: response.userName,
      password: response.password,
    };
  }
  static get(name: string) {
    const cookieName = `${encodeURIComponent(name)}=`;
    const cookie = document.cookie;
    let value = null;

    const startIndex = cookie.indexOf(cookieName);
    if (startIndex > -1) {
      let endIndex: number = cookie.indexOf(';', startIndex);
      if (endIndex == -1) {
        endIndex = cookie.length;
      }
      value = decodeURIComponent(
        cookie.substring(startIndex + cookieName.length, endIndex)
      );
    }
    return value;
  }

  static set(
    name: string,
    value: string,
    expires: Date,
    path: string,
    domain: string,
    secure: string
  ) {
    let cookieText = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
    if (expires instanceof Date) {
      cookieText += `; expires=${expires.toString()}`;
    }

    if (path) cookieText += `; path=${path}`;
    if (domain) cookieText += `; domain=${domain}`;
    if (secure) cookieText += `; secure`;

    document.cookie = cookieText;
  }
}

export { ISignInRequest, auth };
