import { ApiConstants } from "../constants/api.constant";
import { ActivityPagingItem, ActivityPagingParams } from "../types/activity.type";
import { PagingResult } from "../types/paging.type";
import { requests } from "./agent";

const Activities = {
    getPaging: async (params: ActivityPagingParams): Promise<PagingResult<ActivityPagingItem>> => {
        return requests.get(ApiConstants.activities.getPaging(params))
    }
}

export default Activities;