import { observer } from "mobx-react-lite";
import { Grid, Icon, Segment } from "semantic-ui-react";
import { formatActivityDateConversational } from "../../../common/helpers/activities.helper";
import Skeleton from "../../../common/ui/Skeleton/Skeleton";
import { useStore } from "../../../stores/store";
import { formatDate } from "../../../utils/dateTime.util";
import "./Description.scss";
import { isStrNotNullOrUndefined } from "../../../utils/string.util";

const Description = () => {
  const { activitiesStore } = useStore();
  const { currentActivityDetails: currentActivity } = activitiesStore;

  const renderLoadingLine = activitiesStore.isLoading && (
    <Skeleton inline={true} count={1} />
  );

  return (
    <Segment.Group className="activity-detail-desc">
      <Segment>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column width={1}>
              <Icon name="info" color="orange"></Icon>
            </Grid.Column>
            <Grid.Column width={15}>
              {renderLoadingLine}
              <span>
                {formatActivityDateConversational(currentActivity.date)}
              </span>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Segment>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column width={1}>
              <Icon name="calendar" color="orange"></Icon>
            </Grid.Column>
            <Grid.Column width={15}>
              {renderLoadingLine}
              <span>{formatDate(currentActivity.date)}</span>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Segment>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column width={1}>
              <Icon
                name="map marker"
                color="orange"
                style={{ display: "inline-block" }}
              ></Icon>
            </Grid.Column>
            <Grid.Column width={15}>
              {renderLoadingLine}
              <span>
                {currentActivity.venue}
                {isStrNotNullOrUndefined(currentActivity.city)
                  ? `, ${currentActivity.city}`
                  : ""}
              </span>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Segment.Group>
  );
};

export default observer(Description);
