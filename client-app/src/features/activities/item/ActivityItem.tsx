import { Link } from 'react-router-dom';
import { Button, Header, Icon, Item, Label, Segment } from 'semantic-ui-react';
import Avatar, { AvatarSizes } from '../../../components/avatar/Avatar';
import { dateTimeFormat } from '../../../constants/dateTime.constants';
import { IActivity } from '../../../models/activity.model';
import { formatDate } from '../../../utils/dateTime.utils';
import './index.scss';

export interface IActivityItemProps {
    activity: IActivity
}

const ActivityItem = (props: IActivityItemProps) => {
    const { activity } = props;

    return (
        <Item key={activity.id} className='activity-item'>
            <Item.Content>
                <Item.Header as={'h6'}>
                    {formatDate(activity.date, dateTimeFormat.momentDateEventFormat)}
                </Item.Header>
                <Segment>
                    <Item.Meta>
                        <Avatar 
                          src='https://localhost:5000/api/Files?path=user%2Favatars%2Favatar-steven-avatar-nhan-le-20230414074832454.png' 
                          size={AvatarSizes.SMALL}
                        ></Avatar>
                        <div className='title'>
                          <Header as={'h3'}>{activity.title}</Header>
                          <p>Hosted by <span className='host-name'>{activity.hostName}</span></p>
                          <Button inverted color='green'>You are going to this activity</Button>
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