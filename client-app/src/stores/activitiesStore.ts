// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { action, observable } from "mobx";
import agent from "../api/agent";
import { DefaultPaging } from "../constants/common.constant";
import { ActivityDetails, ActivityFilterType, ActivityJoinerItem, ActivityPagingItem, ActivityPagingParams, CreateOrEditActivity } from "../types/activity.type";
import { moveItemToFirst } from "../utils/array.util";
import { isStrNotNullOrUndefined } from "../utils/string.util";
import { currentUserId } from "../utils/authentication.util";

export default class ActivitiesStore {
    @observable isLoading: boolean = false;
    @observable activitiesPagingList: ActivityPagingItem[] = [];
    @observable pagingParams: ActivityPagingParams = {
        ...DefaultPaging,
        searchText: '',
        isHosting: false,
        isGoing: false,
        category: '',
        date: null
    }
    @observable currentActivityDetails: ActivityDetails = {} as ActivityDetails;

    @action showLoading() {
        this.isLoading = true;
    }

    @action hideLoading() {
        this.isLoading = false;
    }

    @action setPagingParams(params: ActivityPagingParams) {
        this.pagingParams = params;
    }

    @action async getPagingList() {
        this.showLoading();
        try {
            const data = await agent.Activities.getPaging(this.pagingParams);
            if (data && data?.result) {
                const { result } = data;
                this.activitiesPagingList = result;
            }
        } catch (error) {
            console.log('Error api: ', error);
            this.hideLoading();
        }
        finally {
            this.hideLoading();
        }
    }

    @action followUser(activityId: string, followerId: string, followingId: string) {
        const index = this.activitiesPagingList.findIndex(x => x.id === activityId);
        if (index > -1) {
            const activityItem = this.activitiesPagingList[index];

            this.activitiesPagingList[index] = {
                ...activityItem,
                joiners: activityItem.joiners.map(item => item.joinerId !== followingId ? { ...item } : {
                    ...item,
                    joinerFollowers: [...item.joinerFollowers, followerId]
                })
            }
        }
    }

    @action unfollowUser(activityId: string, followerId: string, followingId: string) {
        const index = this.activitiesPagingList.findIndex(x => x.id === activityId);
        if (index > -1) {
            const activityItem = this.activitiesPagingList[index];

            this.activitiesPagingList[index] = {
                ...activityItem,
                joiners: activityItem.joiners.map(item => item.joinerId !== followingId ? { ...item } : {
                    ...item,
                    joinerFollowers: [...item.joinerFollowers.filter(f => f !== followerId)]
                })
            }
        }
    }

    @action async create (data: CreateOrEditActivity) {
        this.showLoading();
        try {
            const createResult = await agent.Activities.create(data);
            console.log('createResult', createResult);
            return createResult;
        } catch (error) {
            console.log('Error api: ', error);
            this.hideLoading();
        }
        finally {
            this.hideLoading();
        }
    }

    @action async loadActivityDetails(activityId: string) {
        const index = this.activitiesPagingList.findIndex(x => x.id === activityId);
        if (index !== -1) {
            const loadedData = {
                ...this.activitiesPagingList[index]
            } as ActivityDetails;
            if (loadedData.joiners.length > 0) {
                const hostJoinerIndex = loadedData.joiners.findIndex(x => x.joinerId === loadedData.hostId);
                if (hostJoinerIndex !== 0) {
                    loadedData.joiners = moveItemToFirst(loadedData.joiners, hostJoinerIndex) as ActivityJoinerItem[];
                }
            }
            this.currentActivityDetails = loadedData;
        } else {
            await this.getActivityDetailsApi(activityId);
        }
    }

    @action async getActivityDetailsApi(activityId: string) {
        this.showLoading();
        try {
            const details = await agent.Activities.loadDetails(activityId);
            if (details) {
                if (details.joiners.length > 0) {
                    const hostJoinerIndex = details.joiners.findIndex(x => x.joinerId === details.hostId);
                    if (hostJoinerIndex !== 0) {
                        details.joiners = moveItemToFirst(details.joiners, hostJoinerIndex) as ActivityJoinerItem[];
                    }
                }
                this.currentActivityDetails = details;
            }
        } catch (error) {
            console.log('Error api: ', error);
            this.hideLoading();
        }
        finally {
            this.hideLoading();
        }
    }

    @action setFilterType = (type: ActivityFilterType) => {
        this.pagingParams.isGoing = type === "going";
        this.pagingParams.isHosting = type === "hosting";

        this.getPagingList();
    }

    @action setFilterDate = (date: Date) => {
        this.pagingParams.date = date.toJSON();

        this.getPagingList();
    }

    @action joinActivity = async (activityId: string) => {
        if (isStrNotNullOrUndefined(activityId)) {
            try {
                const joinResult = await agent.ActivityMembers.follow(activityId);
                return joinResult;
            }
            catch (err) {
                console.log('Error Api: ', err)
            }
        }
    }

    @action unjoinActivity = async (activityId: string) => {
        if (isStrNotNullOrUndefined(activityId)) {
            try {
                const unjoinResult = await agent.ActivityMembers.unfollow(activityId);
                return unjoinResult;
            } catch (err) {
                console.log('Error api: ', err)
            }
        }
    }
}