// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { action, observable } from "mobx";
import { ActivityPagingItem, ActivityPagingParams } from "../types/activity.type";
import agent from "../api/agent";
import { DefaultPaging } from "../constants/common.constant";

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
            console.log('index', index);
            console.log('item', this.activitiesPagingList[index])
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
            console.log('index', index);
            console.log('item', this.activitiesPagingList[index])
        }
    }
}