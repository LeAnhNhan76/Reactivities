import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Form, useParams } from "react-router-dom";
import { Button, Card, CardContent, CardHeader, Header, Image, List, ListContent, ListIcon, ListItem, TextArea } from "semantic-ui-react";
import { dateTimeFormat } from "../../../../constants/dateTime.constants";
import { colors } from "../../../../constants/style.constants";
import { useActivityStore } from "../../../../stores/store";
import { formatDate, formatDateTimeUntilNow } from "../../../../utils/dateTime.utils";
import './index.scss';

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
                <Card.Header as={'h2'}>{activity?.title}</Card.Header>
                <Card.Meta>
                    {formatDate(activity?.date, dateTimeFormat.momentDateEventFormat)}
                </Card.Meta>
                <Card.Description>Host by <span className="host-name">{activity?.hostName}</span></Card.Description>
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
                        Activity {formatDateTimeUntilNow(activity?.date)}
                    </ListContent>
                </ListItem>
                <ListItem>
                    <ListIcon name="calendar" color="teal" verticalAlign="middle"></ListIcon>
                    <ListContent verticalAlign="middle">
                        {formatDate(activity?.date, dateTimeFormat.momentDateTimeFormatAMPM)}
                    </ListContent>
                </ListItem>
                <ListItem>
                    <ListIcon name="map marker" color="teal" verticalAlign="middle"></ListIcon>
                    <ListContent verticalAlign="middle">
                        {`${activity?.venue}, ${activity?.city}}`}
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