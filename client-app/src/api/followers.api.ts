import { ApiConstants } from "../constants/api.constant";
import { requests } from "./agent";

const Followers = {
    follow(userId: string): Promise<boolean> {
        return requests.post(ApiConstants.followers.follow(userId));
    },
    unfollow(userId: string) {
        return requests.del(ApiConstants.followers.unfollow(userId));
    }
}

export default Followers;