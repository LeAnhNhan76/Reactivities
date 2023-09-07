import { observer } from "mobx-react-lite";
import { FormEvent, useState } from "react";
import {
  Button,
  Container,
  DropdownItemProps,
  DropdownProps,
  Form,
  Header,
  Segment,
} from "semantic-ui-react";
import { IAddActivity } from "../../../models/add-activity.model";
import { useActivityStore } from "../../../stores/store";
import "./index.scss";
import { toast } from "react-semantic-toasts";

const ActivityForm = () => {
  const { selectedActivity, createActivity } = useActivityStore();

  const [activity, setActivity] = useState<IAddActivity | undefined>(() => {
    if (selectedActivity !== undefined) {
      return selectedActivity;
    }

    return {
      title: "",
      description: "",
      category: "",
      date: new Date(),
      city: "",
      venue: "",
    };
  });

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setActivity((item: any) => {
      return { ...item, [name]: value };
    });
  };

  const handleDropdownChange = (
    event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    if (data) {
      setActivity((item: any) => {
        return { ...item, category: data.value };
      });
    }
  };

  const categoryOptions: DropdownItemProps[] = [
    { key: "cul", text: "Culture", value: "culture" },
    { key: "dri", text: "Drinks", value: "drinks" },
    { key: "fil", text: "Film", value: "film" },
    { key: "foo", text: "Food", value: "food" },
    { key: "mus", text: "Music", value: "music" },
    { key: "tra", text: "Travel", value: "travel" },
  ];

  const handleSubmit = async () => {
    if (activity) {
      const createResult = await createActivity(activity);
      console.log("create", createResult);
      if (createResult === true) {
        toast({
          title: "New activity",
          description: "Your activity create sucessfully!",
          type: "success",
          animation: "fade right",
        });
      }
    }
  };

  return (
    <Container className="activity-form">
      <Segment clearing>
        <Header as={"h1"}>Create new Activity</Header>
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
          <Form.Select
            fluid
            options={categoryOptions}
            placeholder="Select Category"
            onChange={handleDropdownChange}
            value={activity?.category}
            compact
            className="ui-fselect"
            //simple
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
          <Button floated="right" positive type="submit" content="Submit" />
          <Button
            // onClick={() => setEditMode(false)}
            floated="right"
            type="button"
            content="Cancel"
          />
        </Form>
      </Segment>
    </Container>
  );
};

export default observer(ActivityForm);
