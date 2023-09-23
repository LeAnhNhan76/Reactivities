import { Header, Card, Button, Item, Icon, Image } from "semantic-ui-react";
import {
  formatDateTime,
  formatDateTimeConversational,
} from "../../../utils/dateTime.util";
import "./ListItem.scss";
import { Link } from "react-router-dom";
import { ActivityPagingItem } from "../../../types/activity.type";
import { isStrNotNullOrUndefined } from "../../../utils/string.util";
import { loadAvatar } from "../../../common/helpers/file.helper";

type Props = {
  activity: ActivityPagingItem;
};

const ListItem = ({ activity }: Props) => {
  return (
    <div className="activity-list-item">
      <Header
        content={formatDateTime(activity.date)}
        color="orange"
        size="small"
      />
      <Card fluid>
        <Card.Content className="title-section">
          <Item.Group>
            <Item>
              <Item.Image
                alt=""
                src={loadAvatar(
                  activity.joiners.length > 0
                    ? activity.joiners[0].joinerAvatar
                    : ""
                )}
                avatar
              ></Item.Image>
              <Item.Content>
                <Item.Header content={activity.title} />
                <Item.Meta content={`Host by ${activity.hostName}`} />
                <Item.Description>
                  <Button
                    content={"You are going to this activity"}
                    color="green"
                    inverted
                  />
                </Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Card.Content>
        <Card.Content extra>
          <Icon name="clock" />
          <span>{formatDateTime(activity.date)}</span>
          <Icon name="map marker" />
          <span>
            {isStrNotNullOrUndefined(activity.city)
              ? `${activity.venue}, ${activity.city}`
              : activity.venue}
          </span>
        </Card.Content>
        <Card.Content extra className="joiners">
          {activity.joiners.map((item, index) => (
            <Image
              key={item.id}
              src={loadAvatar(item.joinerAvatar)}
              avatar
              alt=""
            />
          ))}
        </Card.Content>
        <Card.Content>
          <span>Activity in {formatDateTimeConversational(activity.date)}</span>
          <Link to={`/activities/${activity.id}`}>
            <Button content="View" className="btn-secondary" floated="right" />
          </Link>
        </Card.Content>
      </Card>
    </div>
  );
};

export default ListItem;
