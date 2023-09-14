import { useState } from "react";
import { Button, Icon, Image, Transition } from "semantic-ui-react";
import agent from "../../api/agent";
import { getAvatar } from "../../helpers/file.helper";
import { MemberJoinInfo } from "../../models/activity.model";
import { useActivityStore } from "../../stores/store";
import { getCurrentUserId } from "../../utils/localStorage.utils";
import "./index.scss";
import OutsideClickHandler from "react-outside-click-handler";

export interface IUserCardProps {
  user: MemberJoinInfo;
  activityId: string;
}

const UserCard = (props: IUserCardProps) => {
  const { user, activityId } = props;

  const { addFollwer, activities } = useActivityStore();

  const userId = getCurrentUserId();

  const isFollowing = () => user.followers.includes(userId ?? "");

  const [isVisibleState, setIsVisibleState] = useState(true);
  const [isVisibleAction, setIsVisbleAction] = useState(false);

  const follow = async () => {
    const result = await agent.Followers.followUser(user.userId);
    if (result === true) {
      addFollwer(activityId, user.userId);
    }
  };

  const unfollow = async () => {
    const result = await agent.Followers.unFollowUser(user.userId);
    if (result === true) {
      // addFollwer(activityId, user.userId);
      console.log("activities", activities);
    }
  };

  const [isFollow, setIsFollow] = useState(false);

  return (
    <div className="user-card">
      <Image src={getAvatar(user.avatar)} size="medium"></Image>
      <h5>{user.displayName}</h5>
      <hr></hr>
      <span>
        <Icon name="user"></Icon>
        {user.followers.length} follwers
      </span>
      {/* <Transition.Group animation="slide right" duration={400}>
        {isVisibleState && (
          <Button
            color="teal"
            fluid
            onClick={() => {
              setIsVisibleState((prev) => !prev);
              setTimeout(() => {
                setIsVisbleAction(true);
              }, 200);
            }}
          >
            {isFollowing() ? "Following" : "Not following"}
          </Button>
        )}
      </Transition.Group>
      {isVisibleAction && (
        <OutsideClickHandler
          onOutsideClick={() => {
            console.log("outside");
          }}
        >
          <Button
            basic
            fluid
            onClick={async () => {
              if (isFollowing()) {
                await unfollow();
              } else {
                await follow();
              }
            }}
          >
            {isFollowing() ? "Unfollow" : "Follow"}
          </Button>
        </OutsideClickHandler>
      )} */}

      {/* Test  */}

      <div style={{ position: "relative" }}>
        <Button
          className={`btn-state ${isVisibleState ? "active" : "hidden"}`}
          onClick={() => setIsVisibleState(false)}
          fluid
        >
          {isFollow ? "Following" : "Not following"}
        </Button>
        {!isVisibleState && (
          <OutsideClickHandler
            onOutsideClick={() => {
              setIsVisibleState(true);
            }}
          >
            <Button
              className="btn-action"
              onClick={() => setIsFollow((prev) => !prev)}
              fluid
            >
              {isFollow ? "Unfollow" : "Follow"}
            </Button>
          </OutsideClickHandler>
        )}
      </div>
    </div>
  );
};

export default UserCard;
