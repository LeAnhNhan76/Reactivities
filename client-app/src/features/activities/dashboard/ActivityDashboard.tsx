import React, { SyntheticEvent, useContext } from 'react'
import { Grid, GridColumn } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import ActivityList from './ActivityList'
import ActivityDetails from '../details/ActivityDetails'
import ActivityForm from '../form/ActivityForm'
import { observer } from 'mobx-react-lite'
import {useStore} from '../../../app/stores/store';


const ActivityDashboard: React.FC = () => {
  const {activityStore} = useStore();
  const {
    editMode,
    selectedActivity
  } = activityStore;
  return (
    <Grid>
      <GridColumn width={10}>
        <ActivityList />
      </GridColumn>
      <GridColumn width={6}>
        {selectedActivity && !editMode && (
          <ActivityDetails />
        )}
        {editMode && (
          <ActivityForm />
        )}
      </GridColumn>
    </Grid>
  );
};

export default observer(ActivityDashboard);