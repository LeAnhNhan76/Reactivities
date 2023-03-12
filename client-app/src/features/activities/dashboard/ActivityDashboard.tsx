import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Grid, GridColumn } from 'semantic-ui-react';
import { SystemConstants } from '../../../constants/setting.constanst';
import LoadingComponent from '../../../layout/LoadingComponent';
import { useStore } from '../../../stores/store';
import ActivityList from './ActivityList';

const ActivityDashboard = () => {
  const {activityStore} = useStore();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if(activityStore.loadingInitial) return <LoadingComponent content={SystemConstants.LoadingApp} />

  return (
    <Grid>
      <GridColumn width={10}>
        <ActivityList />
      </GridColumn>
      <GridColumn width={6}>
        <h2>Activity Filters</h2>
      </GridColumn>
    </Grid>
  );
};

export default observer(ActivityDashboard);