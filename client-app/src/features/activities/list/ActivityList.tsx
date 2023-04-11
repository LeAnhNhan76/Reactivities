import { observer } from 'mobx-react-lite';
import { Item } from 'semantic-ui-react';
import { IActivity } from '../../../models/activity.model';
import ActivityItem from '../item/ActivityItem';

const ActivityList = () => {

  const activity : IActivity = {
    id: '123',
    title: 'New title',
    description: 'New description',
    category: 'Category',
    date: new Date(),
    city: 'HCMC',
    venue: 'new valbeu'
  }

  return (
    <Item.Group >
      <ActivityItem activity={activity}></ActivityItem>
      <ActivityItem activity={activity}></ActivityItem>
      <ActivityItem activity={activity}></ActivityItem>
      <ActivityItem activity={activity}></ActivityItem>
      <ActivityItem activity={activity}></ActivityItem>
    </Item.Group>
  );
};

export default observer(ActivityList);