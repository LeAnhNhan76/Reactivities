import { PagingParams } from "./paging.type";

export type ActivityPagingParams = PagingParams & {
    searchText: string;
    isHosting: boolean;
    isGoing: boolean;
    category: string;
}

export type ActivityPagingItem = {
    id: string;
    title: string;
    category: string;
    date: Date;
    city: string;
    venue: string;
    hostId: string;
    hostName: string;
    status: number;
    statusName: string;
    joiners: ActivityJoinerItem[]
}

export type ActivityJoinerItem = {
    id: string;
    activityId: string;
    joinerId: string;
    joinerAvatar: string;
}