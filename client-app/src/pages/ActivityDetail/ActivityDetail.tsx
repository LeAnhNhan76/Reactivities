import { Grid } from "semantic-ui-react";
import {
  ActivityDetailChats,
  ActivityDetailDescription,
  ActivityDetailHeader,
  ActivityDetailJoiners,
} from "../../components/ActivityDetail";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";

const ActivityDetail = () => {
  const location = useLocation();
  const activityId = location.pathname.split("/")[2];

  const { activitiesStore } = useStore();

  useEffect(() => {
    const loadActivityDetails = async () => {
      await activitiesStore.loadActivityDetails(activityId);
    };

    loadActivityDetails();
  }, [activityId, activitiesStore]);

  return (
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
};

export default observer(ActivityDetail);
