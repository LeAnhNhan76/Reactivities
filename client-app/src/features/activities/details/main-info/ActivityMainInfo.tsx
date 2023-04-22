import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Form, useParams } from "react-router-dom";
import { Button, Card, CardContent, CardHeader, Header, Image, List, ListContent, ListIcon, ListItem, TextArea } from "semantic-ui-react";
import { useActivityStore } from "../../../../stores/store";
import { formatDate } from "../../../../utils/dateTime.utils";
import './index.scss';
import { colors } from "../../../../constants/style.constants";

const ActivityMainInfo = () => {
    const {
        selectedActivity: activity,
        loadActivity,
      } = useActivityStore();
    
      const {id} = useParams();
    
      useEffect(() => {
        if (id) {
          loadActivity(id);
        }
      }, [id, loadActivity]);

  return (
    <div className="activity-main-info">
        <Card fluid className="banner">
            <Image src={`/assets/categoryImages/${activity?.category}.jpg`}></Image>
            <Card.Content className="banner-info">
                <Card.Header>{activity?.title}</Card.Header>
                <Card.Meta>
                    <span>Date</span>
                </Card.Meta>
                {formatDate(activity?.date)}
                <Card.Description>{activity?.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button
                    basic
                    color="orange"
                    content="Cancel Activity"
                />
                <Button
                    color="orange"
                    content="Manage Event"
                    floated="right"
                />
            </Card.Content>
        </Card>
        <Card fluid className="main-info">
            <List divided relaxed >
                <ListItem>
                    <ListIcon name="info" color="teal" verticalAlign="middle"></ListIcon>
                    <ListContent verticalAlign="middle">
                        Activity in 5 months in future
                    </ListContent>
                </ListItem>
                <ListItem>
                    <ListIcon name="calendar" color="teal" verticalAlign="middle"></ListIcon>
                    <ListContent verticalAlign="middle">
                        {activity?.date}
                    </ListContent>
                </ListItem>
                <ListItem>
                    <ListIcon name="map marker" color="teal" verticalAlign="middle"></ListIcon>
                    <ListContent verticalAlign="middle">
                        {activity?.city}
                    </ListContent>
                </ListItem>
            </List>
        </Card>
        <Card className="chat" fluid>
            <CardHeader>
                <Header as={'h3'} block inverted style={{
                    textAlign: 'center',
                    color: colors.$white,
                    backgroundColor: colors.$teal
                }}>
                    Chat about this event
                </Header>
            </CardHeader>
            <CardContent>
                <Form>
                    <TextArea placeholder='Enter your comment (Enter to submit, SHIFT + enter to new line)' fluid>
                    </TextArea>
                </Form>
            </CardContent>
        </Card>
    </div>
  )
}

export default observer(ActivityMainInfo);