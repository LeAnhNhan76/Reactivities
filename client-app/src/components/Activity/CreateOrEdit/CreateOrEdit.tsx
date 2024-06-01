import { observer } from "mobx-react-lite";
import { useState } from "react";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import { SemanticDatepickerProps } from "react-semantic-ui-datepickers/dist/types";
import {
  Button,
  DropdownProps,
  Form,
  FormProps,
  Icon,
  Modal,
} from "semantic-ui-react";
import { activityCategoryOptions } from "../../../constants/activity.constant";
import { DefaultToast } from "../../../constants/common.constant";
import { dateTimeFormat } from "../../../constants/dateTime.constant";
import { useStore } from "../../../stores/store";
import {
  ActivityDetails,
  CreateOrEditActivity,
} from "../../../types/activity.type";
import { ModalProps } from "../../../types/modal.type";
import { now } from "../../../utils/dateTime.util";
import { toastSuccess } from "../../../utils/toast.util";
import "./CreateOrEdit.scss";

type Props = ModalProps & {
  item?: ActivityDetails;
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

  console.log("item", item);

  const initialActivity = item
    ? ({
        ...item,
      } as CreateOrEditActivity)
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

  const handleChangeDate = (_: any, data: SemanticDatepickerProps) => {
    console.log("data: ", data);
    if (data) {
      const newVal = { ...activity, date: data.value } as CreateOrEditActivity;
      setActivity(newVal);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onDismiss}
      closeIcon={<Icon name="close" />}
      size="large"
      style={{ overflowY: "auto", top: "20%" }}
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
              value={activity.title}
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
              value={activity.city}
            />
            <Form.Input
              label="venue"
              width={8}
              className="racti-input"
              name="venue"
              value={activity.venue}
            />
          </Form.Group>
          <Form.Group>
            <div className="w-full">
              <SemanticDatepicker
                format={dateTimeFormat.datepickerFormat}
                className="racti-input racti-semantic-datepicker"
                showToday
                label={"Date"}
                value={new Date()}
                onChange={handleChangeDate}
              />
            </div>
          </Form.Group>
          <Form.Group grouped>
            <Form.TextArea
              label="Description"
              width={16}
              className="racti-input"
              name="desc"
              value={activity.description}
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

export default observer(CreateOrEdit);
