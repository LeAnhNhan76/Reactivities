export interface LoginModel {
  userName: string;
  password: string;
}

export interface LoginResultModel {
  userName: string;
  isLoggedIn: boolean;
  token: string;
}