import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Item } from 'semantic-ui-react';
import { useActivityStore } from '../../../stores/store';
import ActivityItem from '../item/ActivityItem';

const ActivityList = () => {
  const { activitiesByDate, loadActivities } = useActivityStore();
  
  useEffect(() => {
    loadActivities();
  }, [])

  return (
    <Item.Group>
      {activitiesByDate.map(activity => <ActivityItem activity={activity}></ActivityItem>)}
    </Item.Group>
  );
};

export default observer(ActivityList);