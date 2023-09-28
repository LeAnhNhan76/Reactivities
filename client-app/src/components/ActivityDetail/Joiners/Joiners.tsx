import { Segment, Item, Label, Grid } from "semantic-ui-react";
import Avatar from "../../../common/ui/Avatar/Avatar";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";
import { loadAvatar } from "../../../common/helpers/files.helper";
import { currentUserId } from "../../../utils/authentication.util";
import Placeholder from "../../../common/ui/Placeholder/Placeholder";

const Joiners = () => {
  const { activitiesStore } = useStore();
  const { currentActivityDetails } = activitiesStore;

  const userId = currentUserId();
  const isFollowing = (followers: string[]) => followers?.includes(userId);

  return (
    <div>
      <Segment.Group>
        <Segment textAlign="center" className="segment-secondary">
          {currentActivityDetails?.joiners?.length} People going
        </Segment>
        <Segment>
          {activitiesStore.isLoading && <Placeholder lines={7} />}
          <Item.Group divided>
            {currentActivityDetails?.joiners?.map((item, index) => (
              <Item key={item?.id}>
                <Item.Content>
                  <Grid columns={2}>
                    <Grid.Row>
                      <Grid.Column width={10}>
                        <Avatar
                          src={loadAvatar(item?.joinerAvatar)}
                          alt="avatar"
                          title={item?.joinerDisplayName}
                          subTitle={
                            isFollowing(item?.joinerFollowers)
                              ? "Following"
                              : "No follow"
                          }
                          subTitleStyle={{
                            color: isFollowing(item?.joinerFollowers)
                              ? "var(--red-color)"
                              : "var(--secondary-color)",
                          }}
                        />
                      </Grid.Column>
                      {index === 0 && (
                        <Grid.Column width={6}>
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
        </Segment>
      </Segment.Group>
    </div>
  );
};

export default observer(Joiners);
