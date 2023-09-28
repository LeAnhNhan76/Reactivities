import {
  Segment,
  Image,
  Header as SemanticHeader,
  Button,
  Label,
} from "semantic-ui-react";
import { formatDate } from "../../../utils/dateTime.util";
import "./Header.scss";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";
import Placeholder from "../../../common/ui/Placeholder/Placeholder";
import { currentUserId } from "../../../utils/authentication.util";
import { isStrNotNullOrUndefined } from "../../../utils/string.util";
import { toastSuccess } from "../../../utils/toast.util";
import { ActivityStatusEnum } from "../../../enums/common.enum";
import { useState } from "react";

const Header = () => {
  const { activitiesStore } = useStore();
  const { currentActivityDetails } = activitiesStore;

  const userId = currentUserId();
  const isGoing = currentActivityDetails?.joiners
    ?.map((x) => x?.joinerId)
    ?.includes(userId);
  const isHosting = currentActivityDetails?.hostId === userId;

  const [loading, setLoading] = useState(false);

  const handleJoinActivity = async () => {
    if (
      currentActivityDetails &&
      isStrNotNullOrUndefined(currentActivityDetails?.id)
    ) {
      setLoading(true);
      try {
        const joinResult = await activitiesStore.joinActivity(
          currentActivityDetails?.id
        );
        if (joinResult === true) {
          toastSuccess({
            title: "Join Event",
            description: "You already have been joined this event!",
          });
        }
        activitiesStore.loadActivityDetails(currentActivityDetails?.id);
      } catch (error) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
  };

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
                content={currentActivityDetails?.title}
                subheader={formatDate(currentActivityDetails?.date)}
              />
              <span>
                Hosted by{" "}
                <span className="hoster">
                  {currentActivityDetails?.hostName}
                </span>
              </span>
            </div>
          </Segment>
          <Segment>
            {currentActivityDetails?.status === ActivityStatusEnum.InActive && (
              <Label color="red">Already finished!</Label>
            )}
            {currentActivityDetails?.status !== ActivityStatusEnum.InActive && (
              <>
                {!isGoing && (
                  <Button onClick={handleJoinActivity} loading={loading}>
                    Click to join event
                  </Button>
                )}
                {isGoing && !isHosting && (
                  <Button color="red">Cancel attendance</Button>
                )}
                {isGoing && isHosting && (
                  <>
                    <Button>Cancel Activity</Button>
                    <Button floated="right" color="orange">
                      Manage Event
                    </Button>
                  </>
                )}
              </>
            )}
          </Segment>
        </Segment.Group>
      )}
    </div>
  );
};

export default observer(Header);
