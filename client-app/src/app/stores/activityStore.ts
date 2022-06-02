import { observable, action, computed} from 'mobx';
import {IActivity} from '../models/activity';
import agent from '../api/agent';

export default class ActivityStore{

    @observable activities: IActivity[] = [];
    @observable selectedActivity : IActivity | undefined;
    @observable loadingInitial = false;
    @observable editMode = false;
    @observable submitting = false;

    @computed get activitiesByDate() {
        return this.activities.sort((a, b) => Date.parse(a.date)- Date.parse(b.date))
    }

    @action loadActivities = async () => {
        this.setLoadingInitial(true);

        try{
            const activities = await agent.Activities.list();
            activities.forEach(activity => {
                activity.date = activity.date.split(".")[0];
                this.activities.push(activity);
            });
            this.setLoadingInitial(false);
        }
        catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    @action selectActivity = (id: string) => {
        this.selectedActivity = this.activities.find(a => a.id === id);
        this.setEditMode(false);
    }

    @action cancelSelectedActivity = () => {
        this.selectedActivity = undefined;
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

    private setEditMode = (state: boolean) => this.editMode = state;

    private setSubmitting = (state: boolean) => this.submitting = state;
}