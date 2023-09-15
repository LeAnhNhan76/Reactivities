import { Modal, Header, Form, Button } from "semantic-ui-react";

type Props = {
  isOpen: boolean;
  onDissmiss?: VoidFunction;
};

const Login = ({ isOpen, onDissmiss }: Props) => {
  return (
    <Modal
      open={isOpen}
      onClose={onDissmiss}
      size="small"
      closeIcon
      closeOnEscape
      style={{ width: "50%", top: "35%", left: "50%" }}
    >
      <Header
        content="Login to Reactivities"
        color="orange"
        textAlign="center"
        size="large"
      />
      <Modal.Content>
        <Form>
          <Form.Field>
            <input
              placeholder="Enter your username"
              className="re-input-field"
            />
          </Form.Field>
          <Form.Field>
            <input
              placeholder="Enter your password"
              className="re-input-field"
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button fluid color="green" content="Login app" />
      </Modal.Actions>
    </Modal>
  );
};

export default Login;
