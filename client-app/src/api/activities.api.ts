import { ApiConstants } from "../constants/api.constant";
import { ActivityDetails, ActivityPagingItem, ActivityPagingParams, CreateOrEditActivity } from "../types/activity.type";
import { PagingResult } from "../types/paging.type";
import { requests } from "./agent";

const Activities = {
    getPaging: async (params: ActivityPagingParams): Promise<PagingResult<ActivityPagingItem>> => {
        return requests.get(ApiConstants.activities.getPaging(params))
    },
    create: async (data: CreateOrEditActivity): Promise<boolean> => {
        return requests.post(ApiConstants.activities.create(), data);
    },
    loadDetails: async (activiyId: string): Promise<ActivityDetails> => {
        return requests.get(ApiConstants.activities.loadDetails(activiyId));
    }
}

export default Activities;