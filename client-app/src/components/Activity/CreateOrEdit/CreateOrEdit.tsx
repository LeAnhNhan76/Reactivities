import { observer } from "mobx-react-lite";
import { useMemo, useState } from "react";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import { SemanticDatepickerProps } from "react-semantic-ui-datepickers/dist/types";
import {
  Button,
  DropdownProps,
  Form,
  FormGroup,
  FormInput,
  FormSelect,
  FormTextArea,
  Icon,
  Modal,
} from "semantic-ui-react";
import FormFooterButton from "../../../common/ui/Form/FormFooterButton/FormFooterButton";
import { activityCategoryOptions } from "../../../constants/activity.constant";
import { DefaultToast } from "../../../constants/common.constant";
import { dateTimeFormat } from "../../../constants/dateTime.constant";
import { useStore } from "../../../stores/store";
import { CreateOrEditActivity } from "../../../types/activity.type";
import { ModalProps } from "../../../types/modal.type";
import { now } from "../../../utils/dateTime.util";
import { toastSuccess } from "../../../utils/toast.util";
import "./CreateOrEdit.scss";

type Props = ModalProps & {
  editMode?: boolean;
};
const CreateOrEdit = ({ isOpen, editMode, onDismiss }: Props) => {
  const { activitiesStore, commonStore } = useStore();
  const { currentActivityDetails } = activitiesStore;

  const handleSubmitForm = async (
    event: React.FormEvent<HTMLFormElement>,
    data: any
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

    if (editMode) {
      // Update activity
    } else {
      // Create activity
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
        onDismiss?.();
      }
    }
  };

  const initialActivity = useMemo(() => {
    return editMode
      ? ({
          ...currentActivityDetails,
        } as CreateOrEditActivity)
      : ({
          category: activityCategoryOptions[0].value,
          date: now,
        } as CreateOrEditActivity);
  }, [editMode, currentActivityDetails]);

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
    if (data) {
      setActivity((prev: any) => {
        return { ...prev, date: data.value };
      });
    }
  };

  const primaryButtonText = editMode ? "Save" : "Create";

  return (
    <Modal
      open={isOpen}
      onClose={onDismiss}
      closeIcon={<Icon name="close" />}
      size="large"
      style={{ top: "20%" }}
      className="create-new-activity"
    >
      <Modal.Header>Create new activity</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmitForm}>
          <FormGroup widths={"equal"}>
            <FormInput
              fluid
              label="Title"
              name="title"
              value={activity.title}
            />
            <FormSelect
              label="Catogory"
              name="category"
              options={activityCategoryOptions}
              value={activity.category}
              onChange={(_, data) => handleChangeCategory(data)}
            />
          </FormGroup>
          <FormGroup widths={"equal"}>
            <FormInput label="City" name="city" value={activity.city} />
            <FormInput label="Venue" name="venue" value={activity.venue} />
          </FormGroup>
          <FormGroup>
            <div className="w-full mb-5">
              <SemanticDatepicker
                label={"Date"}
                format={dateTimeFormat.datepickerFormat}
                showToday
                value={new Date(activity.date)}
                onChange={handleChangeDate}
              />
            </div>
          </FormGroup>
          <FormTextArea
            label="Description"
            name="desc"
            fluid
            value={activity.description}
          />
          <FormFooterButton>
            <Button color="orange" type="submit">
              {primaryButtonText}
            </Button>
            <Button onClick={onDismiss}>Cancel</Button>
          </FormFooterButton>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default observer(CreateOrEdit);
