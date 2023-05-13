import { Link } from 'react-router-dom';
import { Button, Header, Icon, Item, Label, Segment } from 'semantic-ui-react';
import Avatar, { AvatarSizes } from '../../../components/avatar/Avatar';
import { dateTimeFormat } from '../../../constants/dateTime.constants';
import { IActivity } from '../../../models/activity.model';
import { formatDate } from '../../../utils/dateTime.utils';
import './index.scss';
import { ActivityHelper } from '../../../helpers/activity.helper';
import { getAvatar } from '../../../helpers/file.helper';
import { getAuthInfo } from '../../../utils/localStorage.utils';

export interface IActivityItemProps {
    activity: IActivity
}

const ActivityItem = (props: IActivityItemProps) => {
    const { activity } = props;

    const isHost = activity?.hostId === getAuthInfo()?.userId;
    console.log('host', isHost)

    return (
        <Item className='activity-item'>
            <Item.Content>
                <Item.Header as={'h6'}>
                    {formatDate(activity.date, dateTimeFormat.momentDateEventFormat)}
                </Item.Header>
                <Segment>
                    <Label as={'a'} color={ActivityHelper.getStatusColor(activity.status)} 
                      ribbon={'right'} className='status-ribbon'>{ActivityHelper.getStatusText(activity.status)}</Label>
                    <Item.Meta>
                        <Avatar 
                          src={getAvatar(activity.avatar)}
                          size={AvatarSizes.SMALL}
                        ></Avatar>
                        <div className='title'>
                          <Header as={'h3'}>{activity.title}</Header>
                          <p>Hosted by <span className='host-name'>{activity.hostName}</span></p>
                          <Button size='tiny' color={isHost ? 'orange' : 'green'}>
                            You are {isHost ? 'hosting': 'going'} to this activity
                          </Button>
                        </div>
                    </Item.Meta>
                    <Item.Description>
                      <div className='join-info'>
                        <Icon color='black' name='clock' />
                        <span>{formatDate(activity.date, dateTimeFormat.momentDateLocaleFormat)}</span>
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
                    </Item.Extra>
                </Segment>
            </Item.Content>
        </Item>
    )
}

export default ActivityItem;