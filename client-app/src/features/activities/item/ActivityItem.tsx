import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Confirm, Container, Divider, Header, Icon, Item, Label, Segment } from 'semantic-ui-react';
import { dateTimeFormat } from '../../../constants/dateTime.constants';
import { IActivity } from '../../../models/activity.model';
import { useActivityStore } from '../../../stores/store';
import { formatDate } from '../../../utils/dateTime.utils';
import { isValid } from '../../../utils/string.utils';
import './index.scss';
import Avatar, { AvatarSizes } from '../../../components/avatar/Avatar';

export interface IActivityItemProps {
    activity: IActivity
}

const ActivityItem = (props: IActivityItemProps) => {
    const { activity } = props;
    const {deleteActivity, target, submitting} = useActivityStore();

    const [openConfirm, setOpenConfirm] = useState(false);

    return (
        <Item key={activity.id} className='activity-item'>
            <Item.Content>
                <Item.Header as={'h6'}>
                    {formatDate(activity.date, dateTimeFormat.momentDateEventFormat)}
                </Item.Header>
                <Segment>
                    <Item.Meta>
                        <Avatar 
                          src='https://images.pexels.com/photos/1462636/pexels-photo-1462636.jpeg?auto=compress&cs=tinysrgb&w=600' 
                          size={AvatarSizes.SMALL}
                        ></Avatar>
                        <div className='title'>
                          <Header as={'h4'}>{activity.title}</Header>
                          <p>Hosted by <span className='host-name'>{activity.city}</span></p>
                          <Button inverted color='green'>You are going to this activity</Button>
                        </div>
                    </Item.Meta>
                    <Item.Description>
                      <div className='join-info'>
                        <Icon name='clock' />
                        <span>{formatDate(activity.date)}</span>
                        <Icon name='map marker'></Icon>
                        <span>{`${activity.venue} - ${activity.city}`}</span>
                      </div>
                      <div className='participant'>
                        <Avatar 
                          src='https://images.pexels.com/photos/1462636/pexels-photo-1462636.jpeg?auto=compress&cs=tinysrgb&w=600' 
                          size={AvatarSizes.TINY}
                        ></Avatar>
                        <Avatar 
                          src='https://images.pexels.com/photos/1462636/pexels-photo-1462636.jpeg?auto=compress&cs=tinysrgb&w=600' 
                          size={AvatarSizes.TINY}
                        ></Avatar>
                        <Avatar 
                          src='https://images.pexels.com/photos/1462636/pexels-photo-1462636.jpeg?auto=compress&cs=tinysrgb&w=600' 
                          size={AvatarSizes.TINY}
                        ></Avatar>
                        <Avatar 
                          src='https://images.pexels.com/photos/1462636/pexels-photo-1462636.jpeg?auto=compress&cs=tinysrgb&w=600' 
                          size={AvatarSizes.TINY}
                        ></Avatar>
                      </div>
                    </Item.Description>
                    <Item.Extra>
                        <Button
                            as={Link}
                            to={`/activities/${activity.id}`}
                            floated="right"
                            content="View"
                            color="teal"
                        />
                        {/* <Button
                            name={activity.id}
                            loading={target === activity.id && submitting}
                            onClick={() => setOpenConfirm(true)}
                            floated="right"
                            content="Delete"
                            color="red"
                        /> */}
                        <Label basic content={activity.category} />
                        <Confirm
                          open={openConfirm}
                          content='Are you sure delete this activity?'
                          onCancel={() => setOpenConfirm(false)}
                          onConfirm={() => { 
                            setOpenConfirm(false);
                            deleteActivity(activity.id);
                          }}
                        ></Confirm>
                    </Item.Extra>
                </Segment>
            </Item.Content>
        </Item>
    )
}

export default ActivityItem;