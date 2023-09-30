import { Comment } from "semantic-ui-react";
import { useStore } from "../../stores/store";
import { loadAvatar } from "../../common/helpers/files.helper";
import { formatDateTimeConversational } from "../../utils/dateTime.util";
import { observer } from "mobx-react-lite";

const Comments = () => {
  const { commentsStore } = useStore();
  const { comments } = commentsStore;
  return (
    <div>
      <Comment.Group>
        {comments?.map((comment, index) => (
          <Comment key={comment?.id}>
            <Comment.Avatar src={loadAvatar(comment?.avatar)} />
            <Comment.Content>
              <Comment.Author as="a">{comment?.displayName}</Comment.Author>
              <Comment.Metadata>
                <div>
                  {formatDateTimeConversational(comment?.commentedDate)}
                </div>
              </Comment.Metadata>
              <Comment.Text>{comment?.comment}</Comment.Text>
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

export default observer(Comments);
