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
import { useStore } from "../../stores/store";
import { getAuthenProfile } from "../../utils/authentication.util";
import CreateOrEditActivity from "../Activity/CreateOrEdit/CreateOrEdit";
import Logo from "../../common/ui/Logo/Logo";
import "./Header.scss";

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
  ];
  const profileMenus: DropdownItemProps[] = [
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
          <CreateOrEditActivity
            isOpen={openNewAct}
            onDismiss={() => setOpenNewAct(false)}
          />
        )}
      </Container>
    </div>
  );
};

export default Header;
