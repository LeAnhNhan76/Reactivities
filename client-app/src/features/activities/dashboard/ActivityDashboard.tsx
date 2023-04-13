import { observer } from 'mobx-react-lite';
import { Container, Grid, GridColumn } from 'semantic-ui-react';
import NavBar from '../../../components/nav/NavBar';
import ActivityFilter from '../filter/ActivityFilter';
import ActivityList from '../list/ActivityList';
import './index.scss';

const ActivityDashboard = () => {

  return (
    <div className='activity-dashboard'>
      <NavBar></NavBar>
      <Container className='main-body'>
        <Grid>
          <GridColumn width={10}>
            <ActivityList />
          </GridColumn>
          <GridColumn width={6}>
            <ActivityFilter ></ActivityFilter>
          </GridColumn>
        </Grid>
      </Container>
    </div>
  );
};

export default observer(ActivityDashboard);