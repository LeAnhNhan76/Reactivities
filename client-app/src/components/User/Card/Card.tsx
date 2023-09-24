import { Button, Card, Image, Transition } from "semantic-ui-react";
import { loadAvatar } from "../../../common/helpers/files.helper";
import { ActivityJoinerItem } from "../../../types/activity.type";
import { formatDateTime } from "../../../utils/dateTime.util";
import { currentUserId } from "../../../utils/authentication.util";
import { useRef, useState } from "react";
import { useClickOutside } from "../../../common/hooks/useClickOutSide";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";

type Props = {
  item: ActivityJoinerItem;
};

enum ButtonFollowAction {
  Show = "show",
  Edit = "edit",
}

const UserCard = ({ item }: Props) => {
  const userId = currentUserId();
  const [followAction, setFollowAction] = useState<ButtonFollowAction>(
    ButtonFollowAction.Show
  );
  const [visibleButtonShow, setVisibleButtonShow] = useState(true);

  const isFollowing = item.joinerFollowers.includes(userId);

  const btnEditFollowRef = useRef(null);

  const handleClickOutBtnEditFollow = () => {
    setFollowAction(ButtonFollowAction.Show);
    setTimeout(() => {
      setVisibleButtonShow(true);
    }, 300);
  };

  useClickOutside({
    ref: btnEditFollowRef,
    isOpen: followAction === ButtonFollowAction.Edit,
    handleClickOutside: handleClickOutBtnEditFollow,
  });

  const { usersStore, activitiesStore } = useStore();

  const handleEditFollow = async () => {
    let result: boolean | undefined = false;
    if (isFollowing) {
      result = await usersStore.unfollow(item.joinerId);
    } else {
      result = await usersStore.follow(item.joinerId);
    }

    if (result === true) {
      if (isFollowing) {
        activitiesStore.unfollowUser(item.activityId, userId, item.joinerId);
      } else {
        activitiesStore.followUser(item.activityId, userId, item.joinerId);
      }
    }
  };

  return (
    <Card>
      <Image
        src={loadAvatar(item.joinerAvatar)}
        alt=""
        style={{ height: 275, objectFit: "cover" }}
      />
      <Card.Content>
        <Card.Header>{item.joinerDisplayName}</Card.Header>
        <Card.Meta>Joined {formatDateTime(item.joinerRegisterDate)}</Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <Card.Description>
          {item.joinerFollowers.length} followers
        </Card.Description>
      </Card.Content>
      <Card.Content>
        {followAction === ButtonFollowAction.Show && (
          <Transition.Group animation="slide right" duration={300}>
            {visibleButtonShow && (
              <Button
                color="orange"
                fluid
                size="large"
                onClick={() => {
                  setVisibleButtonShow(false);

                  setTimeout(() => {
                    setFollowAction(ButtonFollowAction.Edit);
                  }, 300);
                }}
                type="button"
              >
                {isFollowing ? "Following" : "No follow"}
              </Button>
            )}
          </Transition.Group>
        )}
        <div ref={btnEditFollowRef}>
          <Transition.Group animation="fade right" duration={300}>
            {followAction === ButtonFollowAction.Edit && (
              <Button
                color={isFollowing ? "red" : "green"}
                fluid
                size="large"
                onClick={handleEditFollow}
                type="button"
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </Button>
            )}
          </Transition.Group>
        </div>
      </Card.Content>
    </Card>
  );
};

export default observer(UserCard);
