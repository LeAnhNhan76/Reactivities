import { action, computed, observable } from 'mobx';
import agent from '../api/agent';
import { IActivity } from '../models/activity';
export default class ActivityStore{

  @observable isLoading = false;
  @observable activities: IActivity[] = [];
  @observable selectedActivity : IActivity | undefined;
  @observable editMode = false;
  @observable submitting = false;
  @observable target: string | undefined;
  
  @computed get activitiesByDate() {
    return this.activities;
  }

  @action loadActivities = async () => {
      this.showLoading();
      const data = await agent.Activities.list();
      if(data) {
        this.activities = [...data];
      }
      this.hideLoading();
  }
  
  @action loadActivity = async (id: string) => {
    let item = this.getActivity(id);
    if(item !== undefined && item !== null) {
      this.selectedActivity = item;
    }
    else {
      this.showLoading();
      const data = await agent.Activities.details(id);
      if(data !== undefined && data !== null) {
        this.selectedActivity = data;
      }
      this.hideLoading();
    }
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
  @action createActivity = async (activity: IActivity) => {
    this.setSubmitting(true);
    await agent.Activities.create(activity);
    this.activities.push(activity);
    this.setSubmitting(false);
    this.setEditMode(false);
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
    await agent.Activities.delete(id).then((result) => {
      this.activities = [...this.activities.filter(x => x.id !== id)];
    });
  }

  private showLoading = () => this.isLoading = true;
  private hideLoading = () => this.isLoading = false;
  public setEditMode = (state: boolean) => this.editMode = state;
  private setSubmitting = (state: boolean) => this.submitting = state;
}