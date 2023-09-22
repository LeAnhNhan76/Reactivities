import { Divider, Grid, Image, Segment, Statistic } from "semantic-ui-react";
import { loadAvatar } from "../../../common/helpers/file.helper";
import { getAuthenProfile } from "../../../utils/authentication.util";
import "./Header.scss";

const ProfileHeader = () => {
  const authenProfile = getAuthenProfile();

  return (
    <div className="profile-header">
      <Segment>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column width={8}>
              <div className="avatar-container">
                <Image
                  bordered
                  src={loadAvatar(authenProfile?.avatar)}
                  avatar
                />
                <span>{authenProfile?.displayName}</span>
              </div>
            </Grid.Column>
            <Grid.Column width={5} largeScreen={4} floated="right">
              <Statistic.Group>
                <Statistic>
                  <Statistic.Value>50</Statistic.Value>
                  <Statistic.Label>Followers</Statistic.Label>
                </Statistic>
                <Statistic>
                  <Statistic.Value>550</Statistic.Value>
                  <Statistic.Label>Following</Statistic.Label>
                </Statistic>
              </Statistic.Group>
              <Divider section />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  );
};

export default ProfileHeader;
