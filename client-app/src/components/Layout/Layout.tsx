import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Container } from "semantic-ui-react";
import Home from "../../pages/Home/Home";
import { hasToken } from "../../utils/authentication.util";
import Header from "../Header/Header";

const Layout = () => {
  const location = useLocation();
  const route = location.pathname.split("/")[1];
  const homeRouting = ["", "home"];
  const navigate = useNavigate();
  const loggedIn = hasToken();

  useEffect(() => {
    if (!loggedIn) {
      navigate("");
    }
    // eslint-disable-next-line
  }, [loggedIn]);

  return (
    <div>
      {!loggedIn || homeRouting.includes(route) ? (
        <Home />
      ) : (
        <>
          <Header />
          <Container style={{ paddingTop: "20px" }}>
            <Outlet />
          </Container>
        </>
      )}
    </div>
  );
};

export default Layout;
