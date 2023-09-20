import { Button, Form, FormProps, Icon, Modal } from "semantic-ui-react";
import { activityCategoryOptions } from "../../../constants/activity.constant";
import { ModalProps } from "../../../types/modal.type";
import "./CreateOrEdit.scss";

type Props = ModalProps;
const CreateOrEdit = ({ isOpen, onDismiss }: Props) => {
  const handleSubmitForm = (
    event: React.FormEvent<HTMLFormElement>,
    data: FormProps
  ) => {
    event.preventDefault();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onDismiss}
      closeIcon={<Icon name="close" />}
      size="large"
      style={{ overflowY: "auto", height: "440px", top: "30%" }}
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
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              label="City"
              width={5}
              className="racti-input"
              name="city"
            />
            <Form.Input
              label="Avenue"
              width={6}
              className="racti-input"
              name="avenue"
            />
            <Form.Input
              label="Date"
              type="date"
              width={5}
              className="racti-input"
              name="date"
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
