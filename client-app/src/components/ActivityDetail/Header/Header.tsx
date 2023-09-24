import {
  Segment,
  Image,
  Header as SemanticHeader,
  Button,
} from "semantic-ui-react";
import { formatDate } from "../../../utils/dateTime.util";
import "./Header.scss";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";
import Placeholder from "../../../common/ui/Placeholder/Placeholder";

const Header = () => {
  const { activitiesStore } = useStore();
  const { currentActivityDetails: currentActivity } = activitiesStore;

  return (
    <div className="activity-detail-header">
      {activitiesStore.isLoading ? (
        <Placeholder.Card lines={12} fluid />
      ) : (
        <Segment.Group>
          <Segment className="banner">
            <Image
              src="https://images.pexels.com/photos/2513605/pexels-photo-2513605.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt=""
            />
            <div className="desc">
              <SemanticHeader
                content={currentActivity?.title}
                subheader={formatDate(currentActivity?.date)}
              />
              <span>
                Hosted by{" "}
                <span className="hoster">{currentActivity?.hostName}</span>
              </span>
            </div>
          </Segment>
          <Segment>
            <Button>Cancel Activity</Button>
            <Button floated="right" color="orange">
              Manage Event
            </Button>
          </Segment>
        </Segment.Group>
      )}
    </div>
  );
};

export default observer(Header);
