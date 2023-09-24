import { Button, Card, Divider, Image } from "semantic-ui-react";
import { loadAvatar } from "../../../common/helpers/files.helper";
import { UserInfoByAvatar } from "../../../types/user.type";
import { formatDateTime } from "../../../utils/dateTime.util";

type Props = {
  userInfo: UserInfoByAvatar;
};

const UserCard = ({ userInfo }: Props) => {
  return (
    <Card>
      <Image
        src={loadAvatar(userInfo.avatar)}
        alt=""
        style={{ height: 275, objectFit: "cover" }}
      />
      <Card.Content>
        <Card.Header>{userInfo.displayName}</Card.Header>
        <Card.Meta>Joined {formatDateTime(userInfo.joinedDate)}</Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <Card.Description>
          {userInfo.followers.length} followers
        </Card.Description>
      </Card.Content>
      <Divider />
      <Button className="btn-secondary" fluid>
        Following
      </Button>
    </Card>
  );
};

export default UserCard;
