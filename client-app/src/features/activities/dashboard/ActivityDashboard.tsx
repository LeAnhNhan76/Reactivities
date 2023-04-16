import { observer } from 'mobx-react-lite';
import { Grid, GridColumn } from 'semantic-ui-react';
import ActivityFilter from '../filter/ActivityFilter';
import ActivityList from '../list/ActivityList';
import './index.scss';

const ActivityDashboard = () => {

  return (
    <div className='activity-dashboard'>
      <Grid>
        <GridColumn width={10}>
          <ActivityList />
        </GridColumn>
        <GridColumn width={6}>
          <ActivityFilter ></ActivityFilter>
        </GridColumn>
      </Grid>
    </div>
  );
};

export default observer(ActivityDashboard);