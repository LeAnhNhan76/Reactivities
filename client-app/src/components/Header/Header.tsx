import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Confirm,
  Container,
  Dropdown,
  DropdownItemProps,
  Icon,
  Image,
  Menu,
} from "semantic-ui-react";
import { loadAvatar } from "../../common/helpers/files.helper";
import Logo from "../../common/ui/Logo/Logo";
import { RoutingConstants } from "../../constants/routing.constant";
import { useStore } from "../../stores/store";
import { getAuthenProfile } from "../../utils/authentication.util";
import { getCurrentRoute } from "../../utils/browser.util";
import "./Header.scss";

type MenuItem = {
  key: string;
  name: string;
  icon: JSX.Element;
  link: string;
};

const Header = () => {
  const navMenus = [
    {
      key: "activities",
      name: "Actvities",
      icon: <Icon name="coffee" />,
      link: "/activities",
    },
    {
      key: "errors",
      name: "Errors",
      icon: <Icon name="bug" />,
      link: "/errors",
    },
  ] as MenuItem[];
  const profileMenus = [
    {
      key: "profile",
      text: "Your profile",
      value: "profile",
      icon: "user",
      onClick: () => {
        navigate(`profile/${authenProfile?.userName}`);
      },
    },
    {
      key: "logout",
      text: "Logout",
      value: "logout",
      icon: "shutdown",
      onClick: () => setOpenConfirmLogout(true),
    },
  ] as DropdownItemProps[];

  const activeRoute = getCurrentRoute(useLocation());
  const isActiveRoute = (key: string) => key === activeRoute;
  const activeRouteIndex = navMenus.findIndex((x) => x.key === activeRoute);
  const navigate = useNavigate();

  const authenProfile = getAuthenProfile();
  const profileTrigger = (
    <div className="profile-menu-trigger">
      <Image avatar src={loadAvatar(authenProfile?.avatar)} />
      <span>{authenProfile?.displayName}</span>
    </div>
  );

  const { authStore } = useStore();

  const [openConfirmLogout, setOpenConfirmLogout] = useState(false);
  const onLogout = () => {
    authStore.logout();
    setOpenConfirmLogout(false);
    navigate("/");
  };

  const onCreateNewActivity = () =>
    navigate(RoutingConstants.CreateNewActivity);

  return (
    <div className="racti-header">
      <Container>
        <Menu activeIndex={activeRouteIndex}>
          <Menu.Item>
            <Link to={"/"}>
              <Logo />
            </Link>
          </Menu.Item>
          {navMenus.map((menu) => (
            <Menu.Item
              key={menu.key}
              name={menu.name}
              active={isActiveRoute(menu.key)}
              onClick={() => navigate(menu.link)}
            >
              {menu.icon}
              <span>{menu.name}</span>
            </Menu.Item>
          ))}
          <Menu.Item>
            <Button
              content="Create new activity"
              icon="add"
              color="green"
              onClick={onCreateNewActivity}
            />
          </Menu.Item>
          <Menu.Menu position="right">
            <Dropdown trigger={profileTrigger} defaultValue={""}>
              <Dropdown.Menu>
                {profileMenus.map((item) => (
                  <Dropdown.Item {...item} />
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Confirm
              header="Logout"
              content="Are you sure to logout now?"
              open={openConfirmLogout}
              size="tiny"
              onCancel={() => setOpenConfirmLogout(false)}
              onConfirm={onLogout}
            />
          </Menu.Menu>
        </Menu>
        {/* {openNewAct && (
          <CreateOrEditActivity
            isOpen={openNewAct}
            onDismiss={() => setOpenNewAct(false)}
          />
        )} */}
      </Container>
    </div>
  );
};

export default Header;
