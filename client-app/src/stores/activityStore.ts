import { action, computed, observable } from 'mobx';
import agent from '../api/agent';
import { ActivityStatusEnum } from '../enums/common.enums';
import { IActivity } from '../models/activity.model';
import { IAddActivity } from '../models/add-activity.model';
import { getCurrentUserId } from '../utils/localStorage.utils';
import BaseStore from './baseStore';

export default class ActivityStore extends BaseStore {

  @observable activities: IActivity[] = [];
  @observable selectedActivity : IActivity | undefined;
  @observable editMode = false;
  @observable submitting = false;
  @observable target: string | undefined;
  
  @computed get activitiesByDate() {
    return this.activities.sort((a: any, b: any) => a.date - b.date);
  }
  @action loadActivities = async () => {
      this.performAnApiActionWithLoading(async () => {
        const data = await agent.Activities.list();
        if(data) {
          this.activities = [...data];
        }
      });
  }
  @action loadActivity = async (id: string) => {
    this.performAnApiActionWithLoading(async () => {
      const data = await agent.Activities.details(id);
      if(data !== undefined && data !== null) {
        this.selectedActivity = data;
      }
    });
  }
  private getActivity = (id: string) => {
    return this.activities.find((x) => x.id === id);
  }
  @action selectActivity = (id: string) => {
    this.selectedActivity = this.activities.find(a => a.id === id);
    this.target = this.selectedActivity?.id;
    this.setEditMode(false);
  }
  @action cancelSelectedActivity = () => {
    this.selectedActivity = undefined;
    this.target = undefined;
    this.setEditMode(false);
  }
  @action createActivity = async (activity: IAddActivity): Promise<any> => {
    let createResult = false;
    await this.performAnApiActionWithLoading(async () => {
      createResult =  await agent.Activities.create(activity);
    });
    this.setEditMode(false);
    return createResult;
  }
  @action editActivity = async (activity: IActivity) => {
    this.setSubmitting(true);
    const result = await agent.Activities.update(activity);
    if(result) {
      this.activities = [...this.activities.map(x => x.id === activity.id ? {...x, ...activity} : x)];
      this.selectedActivity = {...activity};
    }

    this.setSubmitting(false);
    this.setEditMode(false);
  }
  @action openForm = (id?: string): void => {
    id ? this.selectActivity(id) : this.cancelSelectedActivity();
    this.setEditMode(true);
  }
  @action closeForm = () => {
    this.cancelSelectedActivity();
  }
  @action deleteActivity = async (id: string) => {
    this.performAnApiAction(async() => {
      this.target = id;
      this.setSubmitting(true);
      await agent.Activities.delete(id).then((result) => {
        this.activities = [...this.activities.filter(x => x.id !== id)];
      });
    })
  }
  @action cancelActivity = async () => {
    let result = false;
    await this.performAnApiActionWithLoading(async () => {
      if (this.selectedActivity !== null && this.selectedActivity !== undefined) {
        result = await agent.Activities.cancel(this.selectedActivity.id);
        if (result === true) {
          this.selectedActivity.status = ActivityStatusEnum.InActive;
          const newActivities = this.activities.map((item) => {
            if (item.id === this.selectedActivity?.id) {
              return {...item, status: ActivityStatusEnum.InActive}
            }
            else 
              return item;
          });
          this.activities = [...newActivities];
        }
      }
    })
    return result;
  }
  @action addFollwer = (activityId: string, userId: string) => {
    const newActivities = this.activities.map(a => a.id === activityId ? {
      ...a,
      ...a.members?.map(m => m.userId === userId ? {
        ...m,
        followers: [...m.followers, getCurrentUserId()]
      }: m)
    } : a);

    this.activities = newActivities;
  }
  public setEditMode = (state: boolean) => this.editMode = state;
  private setSubmitting = (state: boolean) => this.submitting = state;
}