import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  Header,
  Icon,
  Image,
  Item,
  Popup,
} from "semantic-ui-react";
import {
  formatActivityDateConversational,
  showTextNoOneJoin,
} from "../../../common/helpers/activities.helper";
import { loadAvatar } from "../../../common/helpers/files.helper";
import Placeholder from "../../../common/ui/Placeholder/Placeholder";
import { ActivityPagingItem } from "../../../types/activity.type";
import { currentUserId } from "../../../utils/authentication.util";
import { formatDateTime } from "../../../utils/dateTime.util";
import { isStrNotNullOrUndefined } from "../../../utils/string.util";
import UserCard from "../../User/Card/Card";
import "./ListItem.scss";
import { observer } from "mobx-react-lite";

type Props = {
  activity: ActivityPagingItem;
};

const ListItem = ({ activity }: Props) => {
  const userId = currentUserId();
  const isJoined = activity.joiners.some((x) => x.joinerId === userId);

  const [openUserCard, setOpenUserCard] = useState(false);

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
                    content={
                      isJoined
                        ? "You are going to this activity"
                        : "You have been not joined, yet!"
                    }
                    color={isJoined ? "green" : "red"}
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
          {activity.joiners.length === 0 && (
            <p>{showTextNoOneJoin(activity.date)}</p>
          )}
          {activity.joiners.map((item, index) => {
            const img = (
              <Image
                key={item.id}
                src={loadAvatar(item.joinerAvatar)}
                avatar
                alt=""
              />
            );

            return item.joinerId === userId ? (
              img
            ) : (
              <Popup
                trigger={img}
                // on="click"
                // pinned
                flowing
                hoverable
                onOpen={() =>
                  setTimeout(() => {
                    setOpenUserCard(true);
                  }, 300)
                }
                onClose={() => setOpenUserCard(false)}
              >
                {!openUserCard ? (
                  <Placeholder.Card
                    lines={14}
                    style={{ width: 270, height: 350 }}
                  ></Placeholder.Card>
                ) : (
                  <UserCard item={item} />
                )}
              </Popup>
            );
          })}
        </Card.Content>
        <Card.Content>
          <span>{formatActivityDateConversational(activity.date)}</span>
          <Link to={`/activities/${activity.id}`}>
            <Button content="View" className="btn-secondary" floated="right" />
          </Link>
        </Card.Content>
      </Card>
    </div>
  );
};

export default observer(ListItem);
