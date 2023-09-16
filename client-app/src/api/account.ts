import { ApiConstants } from "../constants/api.constant";
import { LoginResultType, LoginType } from "../types/login.type";
import { requests } from "./agent";

const Account = {
  login: (model: LoginType): Promise<LoginResultType> => {
    return requests.post<LoginResultType>(ApiConstants.account.login(), model);
  }
}

export default Account;