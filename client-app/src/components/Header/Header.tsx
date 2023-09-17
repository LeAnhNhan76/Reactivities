import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Confirm,
  Container,
  Dropdown,
  DropdownItemProps,
  Image,
  Menu,
} from "semantic-ui-react";
import { routingConstants } from "../../constants/routing.constant";
import { loadAvatar } from "../../helpers/file.helper";
import { useStore } from "../../stores/store";
import { getAuthenProfile } from "../../utils/authentication.util";
import Logo from "../Logo/Logo";
import "./Header.scss";
import CreateNewActivity from "../CreateNewActivity/CreateNewActivity";

const Header = () => {
  const navMenus = [
    { key: "activities", name: "Actvities", link: "/activities" },
    { key: "errors", name: "Errors", link: "/errors" },
  ];
  const profileMenus: DropdownItemProps[] = [
    {
      key: "profile",
      text: "Your profile",
      value: "profile",
      icon: "user",
      onClick: () => {
        navigate(routingConstants.Profile);
      },
    },
    {
      key: "logout",
      text: "Logout",
      value: "logout",
      icon: "arrow circle right",
      onClick: () => setOpenConfirmLogout(true),
    },
  ];

  const location = useLocation();
  const route = location.pathname.split("/")[1];
  const activeRouteIndex = navMenus.findIndex((x) => x.key === route);
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
  const [openNewAct, setOpenNewAct] = useState(false);

  const onLogout = () => {
    authStore.logout();
    setOpenConfirmLogout(false);
    navigate("/");
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
          {navMenus.map((menu) => (
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
            <Button
              content="Create new activity"
              icon="add"
              color="green"
              onClick={() => setOpenNewAct(true)}
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
              header="Confirm logout"
              content="Are you sure logout now?"
              open={openConfirmLogout}
              size="tiny"
              onCancel={() => setOpenConfirmLogout(false)}
              onConfirm={onLogout}
            />
          </Menu.Menu>
        </Menu>
        {openNewAct && (
          <CreateNewActivity
            isOpen={openNewAct}
            onDismiss={() => setOpenNewAct(false)}
          />
        )}
      </Container>
    </div>
  );
};

export default Header;
