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
}