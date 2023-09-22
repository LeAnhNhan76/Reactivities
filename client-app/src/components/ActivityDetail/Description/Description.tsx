import { Icon, Segment } from "semantic-ui-react";
import { formatDate } from "../../../utils/dateTime.util";
import "./Description.scss";

const Description = () => {
  return (
    <Segment.Group className="activity-detail-desc">
      <Segment>
        <Icon name="info" color="orange"></Icon>
        <span>Activity 5 month in future</span>
      </Segment>
      <Segment>
        <Icon name="calendar" color="orange"></Icon>
        <span>{formatDate(new Date())}</span>
      </Segment>
      <Segment>
        <Icon name="map marker" color="orange"></Icon>
        <span>Hai Ba Trung Str, Ho Chi Minh City</span>
      </Segment>
    </Segment.Group>
  );
};

export default Description;
