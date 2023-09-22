import { Header, Card, Button, Item, Icon, Image } from "semantic-ui-react";
import { formatDateTime } from "../../../utils/dateTime.util";
import "./ListItem.scss";
import { Link } from "react-router-dom";

const ListItem = () => {
  return (
    <div className="activity-list-item">
      <Header
        content={formatDateTime(new Date())}
        color="orange"
        size="small"
      />
      <Card fluid>
        <Card.Content className="title-section">
          <Item.Group>
            <Item>
              <Item.Image
                alt=""
                src="https://images.pexels.com/photos/18226128/pexels-photo-18226128/free-photo-of-young-fashionable-woman-walking-on-the-street-and-looking-over-her-shoulder.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                avatar
              ></Item.Image>
              <Item.Content>
                <Item.Header content="Future Activity 1" />
                <Item.Meta content="Hosted by Tome" />
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
          <span>{formatDateTime(new Date())}</span>
          <Icon name="map marker" />
          <span>Hai Ba Trung Street</span>
        </Card.Content>
        <Card.Content extra>
          {Array.from(Array(5).keys()).map((item, index) => (
            <Image
              src="https://images.pexels.com/photos/14680537/pexels-photo-14680537.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              avatar
              alt=""
            />
          ))}
        </Card.Content>
        <Card.Content>
          <span>Activity in 1 month future</span>
          <Link to={"/activities/123"}>
            <Button content="View" className="btn-secondary" floated="right" />
          </Link>
        </Card.Content>
      </Card>
    </div>
  );
};

export default ListItem;
