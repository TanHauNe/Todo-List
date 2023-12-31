export interface IUser {
  _id?: string;
  email: string;
  full_name: string;
  url_img: string;
  password?: string;
  role?: number;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  email: string;
  full_name: string;
  url_img: string;
  password: string;
  confirm_password: string;
}

export interface IAuth {
  user: IUser;
  access_token: string;
  refresh_token: string;
}
