import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, Image } from 'semantic-ui-react';
import Spinner from '../../../components/spinner/Spinner';
import { useStore } from '../../../stores/store';
import { formatDate } from '../../../utils/dateTime.utils';

const ActivityDetails = () => {
  const {activityStore} = useStore();
  const {
    selectedActivity: activity,
    setEditMode,
    loadActivity,
    loadingInitial,
    cancelSelectedActivity
  } = activityStore;

  const {id} = useParams();

  useEffect(() => {
    if (id) {
      loadActivity(id);
    }
  }, [id, loadActivity]);

  if (loadingInitial || !activity) return <Spinner />

  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${activity?.category}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>Date</span>
        </Card.Meta>
        {formatDate(activity.date)}
        <Card.Description>{activity.description}</Card.Description>
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