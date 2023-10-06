import { observer } from "mobx-react-lite";
import { Grid, Item, Label, Segment } from "semantic-ui-react";
import { loadAvatar } from "../../../common/helpers/files.helper";
import Avatar from "../../../common/ui/Avatar/Avatar";
import Placeholder from "../../../common/ui/Placeholder/Placeholder";
import { useStore } from "../../../stores/store";
import { currentUserId } from "../../../utils/authentication.util";

const Joiners = () => {
  const { activitiesStore } = useStore();
  const { currentActivityDetails, isLoading } = activitiesStore;

  const userId = currentUserId();
  const isFollowing = (followers: string[]) => followers?.includes(userId);

  return (
    <div>
      <Segment.Group>
        <Segment textAlign="center" className="segment-secondary">
          {isLoading ? (
            <>Loading...</>
          ) : (
            <>{currentActivityDetails?.joiners?.length} People going</>
          )}
        </Segment>
        <Segment>
          {isLoading ? (
            <Placeholder lines={7} />
          ) : (
            <Item.Group divided>
              {currentActivityDetails?.joiners?.map((item, index) => (
                <Item key={item?.id}>
                  <Item.Content>
                    <Grid columns={2}>
                      <Grid.Row>
                        <Grid.Column width={14}>
                          <Avatar
                            src={loadAvatar(item?.joinerAvatar)}
                            alt="avatar"
                            title={item?.joinerDisplayName}
                            subTitle={
                              isFollowing(item?.joinerFollowers)
                                ? "Following"
                                : userId !== item?.joinerId
                                ? "No follow"
                                : ""
                            }
                            subTitleStyle={{
                              color: isFollowing(item?.joinerFollowers)
                                ? "var(--red-color)"
                                : "var(--secondary-color)",
                            }}
                          />
                        </Grid.Column>
                        {index === 0 && (
                          <Grid.Column width={2}>
                            <Label as="a" color="red" ribbon="right">
                              Hosting
                            </Label>
                          </Grid.Column>
                        )}
                      </Grid.Row>
                    </Grid>
                  </Item.Content>
                </Item>
              ))}
            </Item.Group>
          )}
        </Segment>
      </Segment.Group>
    </div>
  );
};

export default observer(Joiners);
