import { useState } from "react";
import { Button, Form, Header } from "semantic-ui-react";
import { getAuthenProfile } from "../../../utils/authentication.util";

const ProfileAbout = () => {
  const authenProfile = getAuthenProfile();
  const [editable, setEditable] = useState(false);
  return (
    <div>
      <Form>
        <Form.Group>
          <Form.Field width={12}>
            <Header
              icon={"user"}
              content={"About " + authenProfile?.displayName}
              size="small"
            ></Header>
          </Form.Field>
          <Form.Field width={4} type="button">
            <Button
              content={!editable ? "Edit" : "Cancel"}
              floated="right"
              size="small"
              color={!editable ? "orange" : undefined}
              onClick={() => setEditable(!editable)}
            ></Button>
          </Form.Field>
        </Form.Group>
        {editable && (
          <>
            <Form.Group grouped>
              <Form.Input
                placeholder="Enter your nickname"
                className="racti-input"
                value={authenProfile?.displayName}
              ></Form.Input>
            </Form.Group>
            <Form.Group grouped>
              <Form.TextArea
                placeholder="Enter your bio"
                className="racti-input"
              ></Form.TextArea>
            </Form.Group>
            <Form.Group>
              <Form.Field width={16}>
                <Button floated="right" positive disabled size="small">
                  Update profile
                </Button>
              </Form.Field>
            </Form.Group>
          </>
        )}
      </Form>
    </div>
  );
};

export default ProfileAbout;
