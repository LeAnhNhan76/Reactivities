import { getAvatar } from "../../helpers/file.helper";
import { MemberJoinInfo } from "../../models/activity.model";
import {Divider, Icon, Image} from 'semantic-ui-react'
import './index.scss';

export interface IUserCardProps {
    user: MemberJoinInfo;
}

const UserCard = (props: IUserCardProps) => {
    const {user} = props;
  return (
    <div className="user-card">
        <Image src={getAvatar(user.avatar)} size="medium"></Image>
        <h5>{user.displayName}</h5>
        <hr></hr>
        <span> 
            <Icon name="user"></Icon>
            {user.followers.length} follwers
        </span> 
    </div>
  )
}

export default UserCard;