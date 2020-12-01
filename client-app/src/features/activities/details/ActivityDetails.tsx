import React, { useContext } from 'react'
import { Button, Card, Image } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import ActivityStore from '../../../app/stores/activityStore';
import { observer } from 'mobx-react-lite'

interface IProps{
    setEditMode: (editMode: boolean) => void;
    setSelectedActivity : (activity : IActivity | null) => void;
}

const ActivityDetails: React.FC<IProps> = ({
  setEditMode,
  setSelectedActivity
}) => {
  const activityStore = useContext(ActivityStore);
  const {selectedActivity : activity} = activityStore;
  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${activity?.category}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{activity?.title}</Card.Header>
        <Card.Meta>
          <span>Date</span>
        </Card.Meta>
        {activity?.date}
        <Card.Description>{activity?.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button
          onClick={() => setEditMode(true)}
          basic
          color="blue"
          content="Edit"
        />
        <Button
          onClick={() => setSelectedActivity(null)}
          basic
          color="grey"
          content="Cancel"
        />
      </Card.Content>
    </Card>
  );
};

export default observer(ActivityDetails);