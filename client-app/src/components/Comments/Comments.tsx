import { Comment } from "semantic-ui-react";

const Comments = () => {
  return (
    <div>
      <Comment.Group>
        {Array.from(Array(10).keys()).map((_, index) => (
          <Comment key={index}>
            <Comment.Avatar src="https://images.pexels.com/photos/18099920/pexels-photo-18099920/free-photo-of-woman-posing-in-front-of-a-modern-building.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load" />
            <Comment.Content>
              <Comment.Author as="a">Matt</Comment.Author>
              <Comment.Metadata>
                <div>Today at 5:42PM</div>
              </Comment.Metadata>
              <Comment.Text>How artistic!</Comment.Text>
              <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Comment>
        ))}
      </Comment.Group>
    </div>
  );
};

export default Comments;
