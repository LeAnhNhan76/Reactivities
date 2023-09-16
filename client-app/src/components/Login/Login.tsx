import { Modal, Header, Form, Button, Message, Input } from "semantic-ui-react";
import { ModalProps } from "../../types/modal.type";
import { LoginType } from "../../types/login.type";
import { useNavigate } from "react-router-dom";
import { toastSuccess } from "../../utils/toast.util";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import { useState } from "react";

type Props = ModalProps;

const Login = ({ isOpen, onDismiss }: Props) => {
  const navigate = useNavigate();
  const { authStore } = useStore();
  const [logginErr, setLogginErr] = useState(false);

  const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.target as HTMLFormElement;
    const { username, pwd } = formElement.elements as any;
    const loginData: LoginType = {
      userName: username.value,
      password: pwd.value,
    };

    const result = await authStore.login(loginData);
    if (result) {
      toastSuccess({
        title: "Logged in successfully!",
        description: "Welcome you back to app, again!",
      });
      setTimeout(() => {
        navigate("/activities");
      }, 1000);
    } else {
      setLogginErr(true);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onDismiss}
      size="small"
      closeIcon
      closeOnEscape
      style={{
        width: "40%",
        maxWidth: "550px",
        top: "35%",
        left: "53%",
      }}
      centered
    >
      <Header
        content="Login to Reactivities"
        color="orange"
        textAlign="center"
        size="large"
      />
      <Modal.Content>
        <Form onSubmit={(event) => handleSubmitForm(event)} error={logginErr}>
          <Message
            error
            header="Login failed"
            content={"Please check your username, or password again!"}
          />
          <Form.Field>
            <Input
              placeholder="Enter your username"
              className="re-app-input"
              name="username"
              size="large"
            />
          </Form.Field>
          <Form.Field>
            <Input
              placeholder="Enter your password"
              className="re-app-input"
              name="pwd"
              size="large"
              type="password"
            />
          </Form.Field>
          <Form.Button fluid>
            <Button
              fluid
              type="submit"
              color="orange"
              content="Login"
              loading={authStore.isLoading}
            />
          </Form.Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default observer(Login);
