import { SystemConstants } from "../constants/setting.constanst";
import { AuthInfoModel } from "../models/login.model";

export const getAuthInfo = () => {
  const authInfo = localStorage.getItem(SystemConstants.AuthInfo);

  if (authInfo !== null && authInfo !== undefined && authInfo !== '') return JSON.parse(authInfo) as AuthInfoModel;

  return null;
}