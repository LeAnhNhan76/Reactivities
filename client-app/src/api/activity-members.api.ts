import { ApiConstants } from "../constants/api.constant";
import { requests } from "./agent";

const ActivityMembers = {
    follow: (activityId: string) => {
        return requests.post(ApiConstants.activityMembers.join(activityId));
    },
    unfollow: (activityId: string) => {
        return requests.del(ApiConstants.activityMembers.unjoin(activityId))
    }
}

export default ActivityMembers;