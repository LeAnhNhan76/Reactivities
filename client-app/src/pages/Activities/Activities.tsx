import { Grid } from "semantic-ui-react";
import ActivityList from "../../components/Activity/List/List";
import ActivityFilter from "../../components/Activity/Filter/Filter";

const Activities = () => {
  return (
    <div>
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column width={10}>
            <ActivityList />
          </Grid.Column>
          <Grid.Column width={6} floated="right">
            <ActivityFilter />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Activities;
