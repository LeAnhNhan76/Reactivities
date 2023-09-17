import { Grid, Icon, Menu, Segment } from "semantic-ui-react";
import ProfileHeader from "../../components/Profile/Header/Header";
import About from "../../components/Profile/About/About";
import "./Profile.scss";
import { useState } from "react";
import Photos from "../../components/Profile/Photos/Photos";
import Events from "../../components/Profile/Events/Events";
import Followers from "../../components/Profile/Followers/Followers";
import Following from "../../components/Profile/Following/Following";

const Profile = () => {
  const [currentMenu, setCurrentMenu] = useState<
    "about" | "photos" | "events" | "followers" | "following"
  >("about");

  const menuBar = [
    {
      key: "about",
      text: "About",
      icon: <Icon name="info" />,
    },
    { key: "photos", text: "Photos", icon: <Icon name="file image outline" /> },
    { key: "events", text: "Events", icon: <Icon name="calendar alternate" /> },
    { key: "followers", text: "Followers", icon: <Icon name="add user" /> },
    {
      key: "following",
      text: "Following",
      icon: <Icon name="add square" />,
    },
  ] as {
    key: "about" | "photos" | "events" | "followers" | "following";
    text: string;
    icon: React.ReactNode;
  }[];

  return (
    <div className="profile-container">
      <ProfileHeader />
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column width={10}>
            <Segment>
              {currentMenu === "about" && <About />}
              {currentMenu === "photos" && <Photos />}
              {currentMenu === "events" && <Events />}
              {currentMenu === "followers" && <Followers />}
              {currentMenu === "following" && <Following />}
            </Segment>
          </Grid.Column>
          <Grid.Column width={6}>
            <Menu vertical fluid>
              {menuBar.map((item) => (
                <Menu.Item
                  key={item.key}
                  onClick={() => setCurrentMenu(item.key)}
                >
                  <>
                    {item.icon}
                    <span>{item.text}</span>
                  </>
                </Menu.Item>
              ))}
            </Menu>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Profile;
