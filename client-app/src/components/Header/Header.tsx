import {
  Container,
  Menu,
  Button,
  Dropdown,
  Image,
  DropdownProps,
  DropdownItemProps,
} from "semantic-ui-react";
import Logo from "../Logo/Logo";
import "./Header.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useStore } from "../../stores/store";
import { getAuthenProfile } from "../../utils/authentication.util";
import { loadAvatar } from "../../helpers/file.helper";

const Header = () => {
  const leftMenus = [
    { key: "activities", name: "Actvities", link: "/activities" },
    { key: "errors", name: "Errors", link: "/errors" },
  ];
  const rightOptions: DropdownItemProps[] = [
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

  const location = useLocation();
  const route = location.pathname.split("/")[1];
  const activeRouteIndex = leftMenus.findIndex((x) => x.key === route);
  const navigate = useNavigate();

  const authenProfile = getAuthenProfile();

  const profileTrigger = (
    <div className="profile-menu-trigger">
      <Image avatar src={loadAvatar(authenProfile?.avatar)} />
      <span>{authenProfile?.displayName}</span>
    </div>
  );

  const { authStore } = useStore();

  const handleChangeDropdown = (
    event: React.SyntheticEvent<HTMLElement, Event>,
    { value }: DropdownProps
  ) => {
    event.preventDefault();
    if (value === "logout") {
      authStore.logout();
      navigate("/");
    }

    if (value === "profile") {
      navigate("profile");
    }
  };

  return (
    <div className="racti-header">
      <Container>
        <Menu activeIndex={activeRouteIndex}>
          <Menu.Item>
            <Link to={"/"}>
              <Logo />
            </Link>
          </Menu.Item>
          {leftMenus.map((menu) => (
            <Menu.Item
              key={menu.key}
              name={menu.name}
              active={menu.key === route}
              onClick={() => {
                navigate(menu.link);
              }}
            />
          ))}
          <Menu.Item>
            <Button content="Create new activity" icon="add" color="green" />
          </Menu.Item>
          <Menu.Menu position="right">
            <Dropdown
              trigger={profileTrigger}
              options={rightOptions}
              onChange={handleChangeDropdown}
            />
          </Menu.Menu>
        </Menu>
      </Container>
    </div>
  );
};

export default Header;
