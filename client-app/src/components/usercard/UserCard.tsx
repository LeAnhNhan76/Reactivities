import { getAvatar } from "../../helpers/file.helper";
import { MemberJoinInfo } from "../../models/activity.model";
import { Button, Icon, Image} from 'semantic-ui-react'
import './index.scss';
import { getAuthInfo, getCurrentUserId } from "../../utils/localStorage.utils";
import { useCallback, useEffect, useState } from "react";
import agent from "../../api/agent";
import { useActivityStore } from "../../stores/store";

export interface IUserCardProps {
    user: MemberJoinInfo;
    activityId: string;
}

const UserCard = (props: IUserCardProps) => {
  const {user, activityId} = props;

  const [isOpenStateButton, setIsOpenStateButton] = useState(true);
  const [isOpenActionButton, setIsOpenActionButton] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);

  const {addFollwer, activities} = useActivityStore();
  
  useEffect(() => {
    const currentUserId = getCurrentUserId()??'';
    const newStatus = user.followers.includes(currentUserId);
    setIsFollowed(newStatus);
  }, [user.followers]);

  const onActionButtonClick = () => {
    const currentState = isFollowed;
    if (currentState) {
      unFollow();
    }
    else {
      follow();
    }
  }

  const follow = async () => {
    const result = await agent.Followers.followUser(user.userId);
    if (result === true) {
      addFollwer(activityId, user.userId);
      setIsFollowed(true);
      toggleButtons();
    }
  }

  const unFollow = () => {

  }

  const toggleButtons = () => {
    setIsOpenStateButton(!isOpenStateButton);
    setIsOpenActionButton(!isOpenActionButton);
  }

  return (
    <div className="user-card">
        <Image src={getAvatar(user.avatar)} size="medium"></Image>
        <h5>{user.displayName}</h5>
        <hr></hr>
        <span> 
            <Icon name="user"></Icon>
            {user.followers.length} follwers
        </span>
        {user.userId !== getCurrentUserId() && <div>
          {isOpenStateButton && <Button color="teal" fluid onClick={() => {
            setIsOpenStateButton(false);
            setIsOpenActionButton(true);
          }}>
            {isFollowed ? 'Following' : 'Not following'}
          </Button>}

          {isOpenActionButton && <Button basic color="teal" fluid onClick={onActionButtonClick}>
            {isFollowed ? 'Unfollow' : 'Follow'}
          </Button>}
        </div>}
    </div>
  )
}

export default UserCard;