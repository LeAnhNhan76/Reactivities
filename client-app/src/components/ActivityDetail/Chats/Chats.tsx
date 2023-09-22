import { Form, Segment, TextArea, Comment } from "semantic-ui-react";
import Comments from "../../Comments/Comments";

const Chats = () => {
  return (
    <div>
      <Segment.Group>
        <Segment textAlign="center" className="segment-secondary">
          Chat about this event
        </Segment>
        <Segment>
          <Form>
            <TextArea
              placeholder="Enter your comment. (Enter to submit, SHIFT + Enter to new line)"
              fluid
              style={{ marginBottom: "15px" }}
            />
            <Comments />
          </Form>
        </Segment>
      </Segment.Group>
    </div>
  );
};

export default Chats;
