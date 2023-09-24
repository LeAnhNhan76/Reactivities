import { useState } from "react";
import {
  Button,
  Form,
  FormProps,
  Icon,
  Modal,
  DropdownProps,
  InputOnChangeData,
} from "semantic-ui-react";
import { activityCategoryOptions } from "../../../constants/activity.constant";
import { CreateOrEditActivity } from "../../../types/activity.type";
import { ModalProps } from "../../../types/modal.type";
import "./CreateOrEdit.scss";
import { now } from "../../../utils/dateTime.util";
import { useStore } from "../../../stores/store";
import { toastSuccess } from "../../../utils/toast.util";
import { DefaultToast } from "../../../constants/common.constant";

type Props = ModalProps & {
  item?: any;
};
const CreateOrEdit = ({ isOpen, item, onDismiss }: Props) => {
  const { activitiesStore, commonStore } = useStore();

  const handleSubmitForm = async (
    event: React.FormEvent<HTMLFormElement>,
    data: FormProps
  ) => {
    event.preventDefault();

    const formElement = event.currentTarget as HTMLFormElement;
    const elements = formElement.elements as any;
    const newestActivity: CreateOrEditActivity = {
      ...activity,
      title: elements.title.value,
      city: elements.city.value,
      venue: elements.venue.value,
      description: elements.desc.value,
    };

    const actionResult = await activitiesStore.create(newestActivity);
    if (actionResult === true) {
      commonStore.setToastPosition("top-right");
      toastSuccess({
        title: "Create new",
        description: "Create new activity was successfully!",
      });

      setTimeout(() => {
        commonStore.resetToastPosition();
      }, DefaultToast.ResetDuration);
    }
  };

  const initialActivity = item
    ? {
        ...item,
      }
    : ({
        category: activityCategoryOptions[0].value,
        date: now,
      } as CreateOrEditActivity);

  const [activity, setActivity] =
    useState<CreateOrEditActivity>(initialActivity);

  const handleChangeCategory = (data: DropdownProps) => {
    if (data && data.value) {
      setActivity((prev: any) => {
        return { ...prev, category: data.value };
      });
    }
  };

  const handleChangeDate = (data: InputOnChangeData) => {
    if (data && data.value) {
      setActivity((prev: any) => {
        return { ...prev, date: data.value };
      });
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onDismiss}
      closeIcon={<Icon name="close" />}
      size="large"
      style={{ overflowY: "auto", height: "500px", top: "30%" }}
      className="create-new-activity"
    >
      <Modal.Header>Create new activity</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmitForm}>
          <Form.Group widths={"equal"}>
            <Form.Input
              className="racti-input"
              fluid
              label="Title"
              width={8}
              name="title"
            />
            <Form.Select
              className="racti-input"
              options={activityCategoryOptions}
              label="Catogory"
              width={8}
              name="category"
              value={activity.category}
              onChange={(_, data) => handleChangeCategory(data)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              label="City"
              width={8}
              className="racti-input"
              name="city"
            />
            <Form.Input
              label="venue"
              width={8}
              className="racti-input"
              name="venue"
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              label="Date"
              type="date"
              width={16}
              className="racti-input"
              name="date"
              value={activity.date}
              onChange={(_, data) => handleChangeDate(data)}
            />
          </Form.Group>
          <Form.Group grouped>
            <Form.TextArea
              label="Description"
              width={16}
              className="racti-input"
              name="desc"
            />
          </Form.Group>
          <Form.Group>
            <Form.Button floated="right" width={16} basic compact>
              <Button color="orange" type="submit">
                Create new
              </Button>
              <Button color="grey" onClick={onDismiss}>
                Cancel
              </Button>
            </Form.Button>
          </Form.Group>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default CreateOrEdit;
