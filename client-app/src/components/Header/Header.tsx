import {
  Container,
  Grid,
  Segment,
  Menu,
  Button,
  Dropdown,
  Image,
} from "semantic-ui-react";
import Logo from "../Logo/Logo";
import "./Header.scss";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const menus = [
    { key: "activities", name: "Actvities" },
    { key: "errors", name: "Errors" },
  ];
  const location = useLocation();
  const route = location.pathname.split("/")[1];
  const activeMenuIndex = menus.findIndex((x) => x.key === route);

  const rightOptions = [
    {
      key: "profile",
      text: "Your profile",
      value: "profile",
    },
    {
      key: "logout",
      text: "Logout",
      value: "logout",
    },
  ];

  const profileMenuTrigger = (
    <div className="profile-menu-trigger">
      <Image
        avatar
        src={
          "https://images.pexels.com/photos/15086131/pexels-photo-15086131/free-photo-of-people-walking-at-a-park.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
        }
      />
      <span>Nhan Le</span>
    </div>
  );

  return (
    <Segment>
      <Container>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column width={12}>
              <Grid>
                <Grid.Row className="navbar">
                  <Link to={""}>
                    <Logo />
                  </Link>
                  <Menu
                    items={menus}
                    activeIndex={activeMenuIndex}
                    compact
                    secondary
                  />
                  <Button
                    content={"Create activity"}
                    icon="add"
                    positive
                    className="btn-create-new"
                  />
                </Grid.Row>
              </Grid>
            </Grid.Column>
            <Grid.Column width={4} floated="right">
              <Dropdown trigger={profileMenuTrigger} options={rightOptions} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  );
};

export default Header;
