import { ApiConstants } from "../constants/api.constant";
import { UserInfoByAvatar } from "../types/user.type";
import { requests } from "./agent";

const Users = {
    getInfoByAvatar(userId: string): Promise<UserInfoByAvatar> {
        return requests.get(ApiConstants.users.getInfoByAvatar(userId));
    }
}

export default Users;