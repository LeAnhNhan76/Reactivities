import { action, computed, observable } from 'mobx';
import agent from '../api/agent';
import { IActivity } from '../models/activity';

export default class ActivityStore{
  @observable activities: IActivity[] = [];
  @observable selectedActivity : IActivity | undefined;
  @observable loadingInitial = false;
  @observable editMode = false;
  @observable submitting = false;
  @observable target: string | undefined;
  @computed get activitiesByDate() {
    return this.activities.sort((a, b) => Date.parse(a.date)- Date.parse(b.date))
  }
  @action loadActivities = async () => {
      this.setLoadingInitial(true);

      try{
          const activities = await agent.Activities.list();
          activities.forEach(activity => {
              this.setActivity(activity);
              this.activities.push(activity);
          });
          this.setLoadingInitial(false);
      }
      catch (error) {
          console.log(error);
          this.setLoadingInitial(false);
      }
  }
  
  @action loadActivity = async (id: string) => {
    let item = this.getActivity(id);
    try {
      if(item !== undefined && item !== null) {
        this.setActivity(item);
        this.selectedActivity = item;
      }
      else {
        this.setLoadingInitial(true);
        const data = await agent.Activities.details(id);
        if(data !== undefined && data !== null) {
          this.setActivity(data);
          this.selectedActivity = data;
        }
        this.setLoadingInitial(false);
      }
    }
    catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  }
  private setActivity = (activity: IActivity) => {
    activity.date = activity.date.split("T")[0];
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
    this.submitting = true;
    try{
      await agent.Activities.create(activity);
      this.activities.push(activity);
      this.setSubmitting(false);
      this.setEditMode(false);
    }
    catch(error){
      this.setSubmitting(false);
      this.setEditMode(false);
      console.log(error);
    }
  }
  @action editActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      const result = await agent.Activities.update(activity);
      if(result) {
        this.activities = [...this.activities.map(x => x.id === activity.id ? {...x, ...activity} : x)];
        this.selectedActivity = {...activity};
      }

      this.setSubmitting(false);
      this.setEditMode(false);
    }
    catch (error) {
      this.setSubmitting(false);
      this.setEditMode(false);
      console.log(error);
    } 
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
  private setLoadingInitial = (state: boolean) => this.loadingInitial = state;
  public setEditMode = (state: boolean) => this.editMode = state;
  private setSubmitting = (state: boolean) => this.submitting = state;
}