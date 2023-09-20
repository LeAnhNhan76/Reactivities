import { Card, Header, Image, Tab } from "semantic-ui-react";
import { formatDateTime } from "../../../utils/dateTime.util";
import "./Events.scss";

const Events = () => {
  const panes = [
    {
      menuItem: "Future events",
      render: () => (
        <Tab.Pane attached={false}>{renderPanelContent()}</Tab.Pane>
      ),
    },
    {
      menuItem: "Past events",
      render: () => (
        <Tab.Pane attached={false}>{renderPanelContent()}</Tab.Pane>
      ),
    },
    {
      menuItem: "Hosting events",
      render: () => (
        <Tab.Pane attached={false}>{renderPanelContent()}</Tab.Pane>
      ),
    },
  ];

  const renderPanelContent = () => (
    <>
      <Card.Group itemsPerRow={4} textAlign="center">
        {Array.from(Array(5).keys()).map((_, index) => (
          <Card key={index} onClick={() => {}}>
            <Image
              src={
                "https://images.pexels.com/photos/18125671/pexels-photo-18125671/free-photo-of-sexy-woman-posing-in-dark.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"
              }
              size="small"
            />
            <Card.Content>
              <Header
                size="tiny"
                content="Future Activity 1"
                subheader={formatDateTime(new Date())}
              ></Header>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </>
  );

  return (
    <div className="profile-events">
      <Header content="Events" icon="calendar" size="small" />
      <Tab
        menu={{ secondary: true, pointing: true }}
        panes={panes}
        style={{
          marginTop: "10px",
        }}
      ></Tab>
    </div>
  );
};

export default Events;
