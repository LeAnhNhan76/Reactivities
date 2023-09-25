import { PagingParams } from "./paging.type";

export type ActivityPagingParams = PagingParams & {
    searchText: string;
    isHosting: boolean;
    isGoing: boolean;
    category: string;
    date: string | null;
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
    joinerDisplayName: string;
    joinerRegisterDate: Date;
    joinerFollowers: string[];
}

export type CreateOrEditActivity = {
    id: string;
    title: string;
    category: string;
    city: string;
    venue: string;
    date: Date;
    description: string;
}

export type ActivityDetails = ActivityPagingItem & {
    description: string;
}

export type ActivityFilterType = "all" | "going" | "hosting";