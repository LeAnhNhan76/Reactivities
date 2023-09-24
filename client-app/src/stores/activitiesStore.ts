// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { action, observable } from "mobx";
import agent from "../api/agent";
import { DefaultPaging } from "../constants/common.constant";
import { ActivityDetails, ActivityPagingItem, ActivityPagingParams, CreateOrEditActivity } from "../types/activity.type";

export default class ActivitiesStore {
    @observable isLoading: boolean = false;
    @observable activitiesPagingList: ActivityPagingItem[] = [];
    @observable pagingParams: ActivityPagingParams = {
        ...DefaultPaging,
        searchText: '',
        isHosting: false,
        isGoing: false,
        category: ''
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
            this.currentActivityDetails = {
                ...this.activitiesPagingList[index],
            } as ActivityDetails;
        } else {
            this.showLoading();
            try {
                const details = await agent.Activities.loadDetails(activityId);
                if (details) {
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
    }
}