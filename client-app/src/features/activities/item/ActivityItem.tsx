import { Link } from 'react-router-dom';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { dateTimeFormat } from '../../../constants/dateTime.constants';
import { IActivity } from '../../../models/activity.model';
import { formatDate } from '../../../utils/dateTime.utils';
import { isValid } from '../../../utils/string.utils';
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
                        <Item.Image size='mini' centered circular
                            src='https://images.pexels.com/photos/1462636/pexels-photo-1462636.jpeg?auto=compress&cs=tinysrgb&w=600'>
                        </Item.Image>
                        {activity.title}
                    </Item.Meta>
                    <Item.Description>
                    {formatDate(activity.date)}
                    <div>{activity.description}</div>
                    <div>
                        {activity.city}
                        {isValid(activity.venue) ? `, ${activity.venue}`: ''}
                    </div>
                    </Item.Description>
                    <Item.Extra>
                        <Button
                            as={Link}
                            // to={`/activities/${activity.id}`}
                            floated="right"
                            content="View"
                            color="blue"
                        />
                        <Button
                            // name={activity.id}
                            // loading={target === activity.id && submitting}
                            // onClick={() => deleteActivity(activity.id)}
                            floated="right"
                            content="Delete"
                            color="red"
                        />
                        <Label basic content={activity.category} />
                    </Item.Extra>
                </Segment>
            </Item.Content>
        </Item>
    )
}

export default ActivityItem;