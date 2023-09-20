import React from "react";
import { Button, Card, Header, Icon, Image } from "semantic-ui-react";
import { getAuthenProfile } from "../../../utils/authentication.util";

const Following = () => {
  const authenProfile = getAuthenProfile();

  return (
    <div>
      <div>
        <Header
          content={`People is ${authenProfile?.displayName} following`}
          icon={"user"}
        />
        <Card.Group style={{ marginTop: "10px" }} itemsPerRow={3}>
          {Array.from(Array(10).keys()).map((item, index) => (
            <Card key={index}>
              <Image
                src="https://images.pexels.com/photos/17435121/pexels-photo-17435121/free-photo-of-eyeglasses-next-to-a-cup-of-coffee.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                alt=""
                height={300}
                style={{ objectFit: "cover" }}
              />
              <Header
                content="John Henry"
                style={{ padding: "15px", paddingBottom: "20px" }}
                size="small"
              />
              <Card.Content extra>
                <Icon name="user" />
                <span>2 followers</span>
              </Card.Content>
              <Button
                fluid
                className="btn-secondary"
                content="Follow"
                type="button"
              />
            </Card>
          ))}
        </Card.Group>
      </div>
    </div>
  );
};

export default Following;
