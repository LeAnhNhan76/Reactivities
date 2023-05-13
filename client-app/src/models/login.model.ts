export interface LoginModel {
  userName: string;
  password: string;
}

export interface AuthInfoModel {
  userName: string;
  displayName: string;
  isLoggedIn: boolean;
  token: string;
  avatar: string;
  userId: string;
}