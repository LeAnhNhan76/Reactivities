import { observer } from 'mobx-react-lite';
import { FormEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { v4 as uuid } from 'uuid';
import { IActivity } from '../../../models/activity.model';
import { useStore } from '../../../stores/store';

const ActivityForm = () => {
  const {activityStore} = useStore();
  const {
    createActivity,
    selectedActivity,
    setEditMode,
    submitting,
    editActivity
  } = activityStore;

  const [activity, setActivity] = useState<IActivity | undefined> (() => {
    if(selectedActivity !== undefined) {
      return selectedActivity;
    }

    return {
      id: '',
      title: '',
      description: '',
      category: '',
      date: new Date(),
      city: '',
      venue: ''
    };
  });

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setActivity((item: any) => {return {...item, [name]: value}});
  };

  const handleSubmit = () => {
    if(activity) {
      if(activity.id === '') {
        let newActivity = {
          ...activity, 
          id: uuid()
        }
        createActivity(newActivity);
      }
      else{
        editActivity(activity);
      }
    }
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          onChange={handleInputChange}
          name="title"
          placeholder="Title"
          value={activity?.title}
        />
        <Form.TextArea
          onChange={handleInputChange}
          name="description"
          row={2}
          placeholder="Description"
          value={activity?.description}
        />
        <Form.Input
          onChange={handleInputChange}
          name="category"
          placeholder="Category"
          value={activity?.category}
        />
        <Form.Input
          onChange={handleInputChange}
          name="date"
          type="datetime-local"
          placeholder="Date"
          value={activity?.date}
        />
        <Form.Input
          onChange={handleInputChange}
          name="city"
          placeholder="City"
          value={activity?.city}
        />
        <Form.Input
          onChange={handleInputChange}
          name="venue"
          placeholder="Venue"
          value={activity?.venue}
        />
        <Button
          loading={submitting}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button
          onClick={() => setEditMode(false)}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);