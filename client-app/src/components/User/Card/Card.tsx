import { Button, Card, Image } from "semantic-ui-react";
import { loadAvatar } from "../../../common/helpers/files.helper";
import { ActivityJoinerItem } from "../../../types/activity.type";
import { formatDateTime } from "../../../utils/dateTime.util";

type Props = {
  item: ActivityJoinerItem;
};

const UserCard = ({ item }: Props) => {
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
      <Button className="btn-secondary" fluid size="large">
        Following
      </Button>
    </Card>
  );
};

export default UserCard;
