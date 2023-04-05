import { observer } from 'mobx-react-lite';
import { Grid, GridColumn } from 'semantic-ui-react';
import ActivityList from '../list/ActivityList';
import NavBar from '../../../components/nav/NavBar';

const ActivityDashboard = () => {

  return (
    <div className='activity-dashboard'>
      <NavBar></NavBar>
      <Grid>
        <GridColumn width={10}>
          <ActivityList />
        </GridColumn>
        <GridColumn width={6}>
          <h2>Activity Filters</h2>
        </GridColumn>
      </Grid>
    </div>
  );
};

export default observer(ActivityDashboard);