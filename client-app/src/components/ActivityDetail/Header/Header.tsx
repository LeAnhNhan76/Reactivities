import { observer } from "mobx-react-lite";
import { useState } from "react";
import {
  Button,
  Image,
  Label,
  Segment,
  Header as SemanticHeader,
} from "semantic-ui-react";
import Placeholder from "../../../common/ui/Placeholder/Placeholder";
import { ActivityStatusEnum } from "../../../enums/common.enum";
import { useStore } from "../../../stores/store";
import { currentUserId } from "../../../utils/authentication.util";
import { formatDate } from "../../../utils/dateTime.util";
import { isStrNotNullOrUndefined } from "../../../utils/string.util";
import { toastSuccess } from "../../../utils/toast.util";
import "./Header.scss";

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
        activitiesStore.getActivityDetailsApi(currentActivityDetails?.id);
      } catch (error) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleUnjoinActivity = async () => {
    if (
      currentActivityDetails &&
      isStrNotNullOrUndefined(currentActivityDetails?.id)
    ) {
      setLoading(true);
      try {
        const result = await activitiesStore.unjoinActivity(
          currentActivityDetails?.id
        );
        if (result === true) {
          toastSuccess({
            title: "Cancel attandance",
            description: "You was cancel attandance",
          });
          activitiesStore.getActivityDetailsApi(currentActivityDetails?.id);
        }
      } catch (error) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
  };

  const renderButtonsStatusNotInActive = () => {
    if (isGoing && isHosting) {
      return (
        <>
          <Button>Cancel Activity</Button>
          <Button
            floated="right"
            color="orange"
            // onClick={() => setOpenManageEvent(true)}
          >
            Manage Event
          </Button>
        </>
      );
    }

    if (!isGoing) {
      return (
        <Button onClick={handleJoinActivity} loading={loading}>
          Click to join event
        </Button>
      );
    }

    return (
      <Button color="red" onClick={handleUnjoinActivity} loading={loading}>
        Cancel attendance
      </Button>
    );
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
            {currentActivityDetails?.status !== ActivityStatusEnum.InActive &&
              renderButtonsStatusNotInActive()}
            {/* {openManageEvent && (
              <CreateOrEdit
                isOpen={openManageEvent}
                onDismiss={() => setOpenManageEvent(false)}
                editMode={true}
              />
            )} */}
          </Segment>
        </Segment.Group>
      )}
    </div>
  );
};

export default observer(Header);
