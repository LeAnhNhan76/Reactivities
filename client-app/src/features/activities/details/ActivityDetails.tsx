import { observer } from 'mobx-react-lite';
import { Grid, GridColumn } from 'semantic-ui-react';
import ActivityMembers from './members/ActivityMembers';
import ActivityMainInfo from './main-info/ActivityMainInfo';

const ActivityDetails = () => {
  return (
    <div className='activity-details'>
      <Grid>
        <GridColumn width={10}>
          <ActivityMainInfo></ActivityMainInfo>
        </GridColumn>
        <GridColumn width={6}>
          <ActivityMembers></ActivityMembers>
        </GridColumn>
      </Grid>
    </div>
  );
};

export default observer(ActivityDetails);