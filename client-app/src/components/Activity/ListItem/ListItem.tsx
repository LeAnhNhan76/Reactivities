import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Header,
  Icon,
  Image,
  Item,
  Label,
  Popup,
  SemanticCOLORS,
} from "semantic-ui-react";
import {
  formatActivityDateConversational,
  showTextNoOneJoin,
} from "../../../common/helpers/activities.helper";
import { loadAvatar } from "../../../common/helpers/files.helper";
import Placeholder from "../../../common/ui/Placeholder/Placeholder";
import { ActivityStatusEnum } from "../../../enums/common.enum";
import { ActivityPagingItem } from "../../../types/activity.type";
import { currentUserId } from "../../../utils/authentication.util";
import { formatDateTime } from "../../../utils/dateTime.util";
import { isStrNotNullOrUndefined } from "../../../utils/string.util";
import UserCard from "../../User/Card/Card";
import "./ListItem.scss";

type Props = {
  activity: ActivityPagingItem;
};

const statusInfoMap = new Map<
  ActivityStatusEnum,
  { title: string; color: SemanticCOLORS }
>([
  [ActivityStatusEnum.Pending, { title: "Coming soon", color: "orange" }],
  [ActivityStatusEnum.Active, { title: "Happening", color: "green" }],
  [ActivityStatusEnum.InActive, { title: "Finished", color: "red" }],
]);

const ListItem = ({ activity }: Props) => {
  const userId = currentUserId();
  const [openUserCard, setOpenUserCard] = useState(false);
  const navigate = useNavigate();
  const handleViewDetails = () => {
    navigate(`/activities/${activity.id}`);
  };
  const statusInfo = statusInfoMap.get(activity?.status);

  return (
    <div className="activity-list-item">
      <Header
        content={formatDateTime(activity.date)}
        color={statusInfo?.color}
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
                <Item.Header>{activity.title}</Item.Header>
                <Item.Meta
                  content={
                    <span>
                      Host by <b>{activity.hostName}</b>
                    </span>
                  }
                />
                <Item.Description>
                  <Label
                    content={statusInfo?.title}
                    color={statusInfo?.color}
                    size="medium"
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
                key={item.id}
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
          <Button
            content="View"
            className="btn-secondary"
            floated="right"
            onClick={handleViewDetails}
          />
        </Card.Content>
      </Card>
    </div>
  );
};

export default observer(ListItem);
