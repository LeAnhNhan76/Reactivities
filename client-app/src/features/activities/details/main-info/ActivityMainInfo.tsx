import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Form, useParams } from "react-router-dom";
import { Button, Card, CardContent, CardHeader, Confirm, Header, Image, List, ListContent, ListIcon, ListItem, TextArea } from "semantic-ui-react";
import { dateTimeFormat } from "../../../../constants/dateTime.constants";
import { colors } from "../../../../constants/style.constants";
import { useActivityStore } from "../../../../stores/store";
import { formatDate, formatDateTimeUntilNow } from "../../../../utils/dateTime.utils";
import { toast } from 'react-semantic-toasts';
import './index.scss';
import { ActivityHelper } from "../../../../helpers/activity.helper";
import { ActivityStatusEnum } from "../../../../enums/common.enums";

const ActivityMainInfo = () => {
  const {
      selectedActivity: activity,
      loadActivity,
      cancelActivity,
      isLoading
  } = useActivityStore();
  
  const {id} = useParams();
  
  useEffect(() => {
      if (id) {
          loadActivity(id);
      }
  }, [id, loadActivity]);
  
  const [isConfirmCancel, setIsConfirmCancel] = useState<boolean>(false);
  
  const onCancel = async () => {
    setIsConfirmCancel(false);
    const result = await cancelActivity();
    console.log('result', result);
    if (result === true) {
        toast({
            type: 'success',
            title: 'Cancel Activity',
            description: 'You canceled this activity sucessfully'
        });
    }
  }

  if (activity === null || activity === undefined) return <></>;

  const statusColor = ActivityHelper.getStatusColor(activity.status);

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
                    loading={isLoading}
                    onClick={() => setIsConfirmCancel(true)}
                />
                <Button
                    color="orange"
                    content="Manage Event"
                    floated="right"
                />
                <Confirm
                    open={isConfirmCancel}
                    header='Cancel Activity'
                    content='Are you sure cancel this activity'
                    onCancel={() => setIsConfirmCancel(false)}
                    onConfirm={onCancel}
                >
                </Confirm>
            </Card.Content>
        </Card>
        <Card fluid className="main-info">
            <List divided relaxed >
                <ListItem>
                    <ListIcon name="wait" color={statusColor} verticalAlign="middle"></ListIcon>
                    <ListContent verticalAlign="middle">
                        {ActivityHelper.getStatusText(activity.status)}
                    </ListContent>
                </ListItem>
                <ListItem>
                    <ListIcon name="info" color={statusColor} verticalAlign="middle"></ListIcon>
                    <ListContent verticalAlign="middle">
                        Activity in {formatDateTimeUntilNow(activity?.date)}
                    </ListContent>
                </ListItem>
                <ListItem>
                    <ListIcon name="calendar" color={statusColor} verticalAlign="middle"></ListIcon>
                    <ListContent verticalAlign="middle">
                        {formatDate(activity?.date, dateTimeFormat.momentDateTimeFormatAMPM)}
                    </ListContent>
                </ListItem>
                <ListItem>
                    <ListIcon name="map marker" color={statusColor} verticalAlign="middle"></ListIcon>
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