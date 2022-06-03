import React, { useContext } from 'react'
import { Button, Card, Image } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';

const ActivityDetails: React.FC = () => {
  const {activityStore} = useStore();
  const {
    selectedActivity: activity,
    setEditMode,
    cancelSelectedActivity
  } = activityStore;
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
          onClick={() => cancelSelectedActivity()}
          basic
          color="grey"
          content="Cancel"
        />
      </Card.Content>
    </Card>
  );
};

export default observer(ActivityDetails);