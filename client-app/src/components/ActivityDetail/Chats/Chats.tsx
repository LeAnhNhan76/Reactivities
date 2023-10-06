import { Form, Segment, TextArea } from "semantic-ui-react";
import Comments from "../../Comments/Comments";
import { useEffect } from "react";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";
import { isStrNotNullOrUndefined } from "../../../utils/string.util";
import { useForm, Controller } from "react-hook-form";
import { getAuthenProfile } from "../../../utils/authentication.util";
import Skeleton from "../../../common/ui/Skeleton/Skeleton";

const defaultForm = {
  comment: "",
};

const Chats = () => {
  const { commentsStore, activitiesStore } = useStore();
  const { getValues, control, handleSubmit, reset } = useForm({
    mode: "all",
    defaultValues: defaultForm,
  });
  const authenProfile = getAuthenProfile();

  useEffect(() => {
    if (
      activitiesStore.currentActivityDetails &&
      isStrNotNullOrUndefined(activitiesStore.currentActivityDetails?.id)
    ) {
      commentsStore.createHubConnection(
        activitiesStore.currentActivityDetails?.id
      );
    }

    return () => {
      commentsStore.clearComments();
    };
  }, [activitiesStore.currentActivityDetails, commentsStore]);

  const submitComment = async () => {
    const { comment } = getValues();

    await commentsStore.addComment({
      activityId: activitiesStore?.currentActivityDetails?.id,
      userId: authenProfile?.userId!,
      comment: comment,
    });

    reset();
  };

  return (
    <div>
      <Segment.Group>
        <Segment textAlign="center" className="segment-secondary">
          Chat about this event
        </Segment>
        <Segment>
          <Form onSubmit={handleSubmit(() => submitComment())}>
            <Controller
              name="comment"
              control={control}
              render={({ field }) => (
                <TextArea
                  {...field}
                  placeholder="Enter your comment. (Enter to submit, SHIFT + Enter to new line)"
                  fluid
                  style={{ marginBottom: "15px" }}
                  onKeyPress={(e: any) => {
                    if (e.key === "Enter" && e.shiftKey) {
                      return;
                    }
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      submitComment();
                    }
                  }}
                />
              )}
            />
            {activitiesStore.isLoading ? <Skeleton count={5} /> : <Comments />}
          </Form>
        </Segment>
      </Segment.Group>
    </div>
  );
};

export default observer(Chats);
