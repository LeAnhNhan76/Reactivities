import { useParams } from "react-router-dom";
import { useActivityStore } from "../../../../stores/store";
import { useEffect } from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { formatDate } from "../../../../utils/dateTime.utils";
import { observer } from "mobx-react-lite";

const ActivityMainInfo = () => {
    const {
        selectedActivity: activity,
        setEditMode,
        loadActivity,
        cancelSelectedActivity
      } = useActivityStore();
    
      const {id} = useParams();
    
      useEffect(() => {
        if (id) {
          loadActivity(id);
        }
      }, [id, loadActivity]);

  return (
    <div className="activity-main-info">
        <Card fluid>
            <Card.Content>
                <Image
                    src={`/assets/categoryImages/${activity?.category}.jpg`}
                    wrapped
                    ui={false}
                />
                <Card.Header>{activity?.title}</Card.Header>
                <Card.Meta>
                    <span>Date</span>
                </Card.Meta>
                {formatDate(activity?.date)}
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
    </div>
  )
}

export default observer(ActivityMainInfo);