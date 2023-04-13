import { Calendar } from 'react-calendar';
import { Icon, List, Segment } from 'semantic-ui-react';
import './index.scss';
import { useState } from 'react';

const ActivityFilter = () => {
    const [date, setDate] = useState(new Date());

    const onChangeDate = (e: any) => {
        console.log('eee', e)
    }

    return (
        <div className="activity-filter">
            <Segment className='filters'>
                <List divided relaxed>
                    <List.Item>
                        <List.Content className='icon'>
                            <Icon name='filter' size='large'></Icon>
                            <span>Filters</span>
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Content>
                            All activities
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Content>
                            I'm going
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Content>
                            I'm hosting
                        </List.Content>
                    </List.Item>
                </List>
            </Segment>
            <Segment className='calendar'>
                <Calendar value={date} onChange={onChangeDate}></Calendar>
            </Segment>
        </div>
    )
}

export default ActivityFilter