import { Link } from 'react-router-dom';
import { Button, Header, Item, Label, Segment } from 'semantic-ui-react';
import { IActivity } from '../../../models/activity';
import { formatDate } from '../../../utils/dateTime.utils';
import { isValid } from '../../../utils/string.utils';

export interface IActivityItemProps {
    activity: IActivity
}

const ActivityItem = (props: IActivityItemProps) => {
    const { activity } = props;
    return (
        <Item key={activity.id}>
            <Item.Content>
                <Item.Header as="a">
                    03 MAR 2023
                </Item.Header>
                <Segment>
                <Item.Meta>
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