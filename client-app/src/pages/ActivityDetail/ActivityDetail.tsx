import { Grid } from "semantic-ui-react";
import {
  ActivityDetailChats,
  ActivityDetailDescription,
  ActivityDetailHeader,
  ActivityDetailJoiners,
} from "../../components/ActivityDetail";

const ActivityDetail = () => (
  <div>
    <Grid columns={2}>
      <Grid.Row>
        <Grid.Column width={10}>
          <ActivityDetailHeader />
          <ActivityDetailDescription />
          <ActivityDetailChats />
        </Grid.Column>
        <Grid.Column widescreen={6}>
          <ActivityDetailJoiners />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
);

export default ActivityDetail;
