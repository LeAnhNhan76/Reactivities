import { Link, useNavigate } from 'react-router-dom';
import {
  Button, Header, Icon,
  Image,
  Item, Label, Popup, Segment
} from 'semantic-ui-react';
import Avatar, { AvatarSizes } from '../../../components/avatar/Avatar';
import UserCard from '../../../components/usercard/UserCard';
import { dateTimeFormat } from '../../../constants/dateTime.constants';
import { ActivityHelper } from '../../../helpers/activity.helper';
import { getAvatar } from '../../../helpers/file.helper';
import { IActivity } from '../../../models/activity.model';
import { formatDate } from '../../../utils/dateTime.utils';
import { getAuthInfo } from '../../../utils/localStorage.utils';
import './index.scss';
import { useActivityStore } from '../../../stores/store';

export interface IActivityItemProps {
    activity: IActivity
}

const ActivityItem = (props: IActivityItemProps) => {
    const { activity } = props;

    const navigate = useNavigate();
    const {loadActivity} = useActivityStore();

    const isHost = activity?.hostId === getAuthInfo()?.userId;

    const viewDetails = async () => {
      
      const id = activity.id;
      if (id) {
        await loadActivity(id);
        navigate(`/activities/${id}`);
      }
    }

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
                        {activity.members?.map((item, index) => {
                          return <Popup key={index} 
                            trigger={<Image src={getAvatar(item.avatar)} avatar></Image>
                          }
                          content={<UserCard user={item} />}/>
                        })}
                      </div>
                    </Item.Description>
                    <Item.Extra>
                        <Button
                            onClick={viewDetails}
                            floated="right"
                            content="View"
                            color="teal"
                        />
                        <Label basic content={activity.category} />
                    </Item.Extra>
                </Segment>
            </Item.Content>
        </Item>
    )
}

export default ActivityItem;