import { useEffect, useMemo } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Container } from "semantic-ui-react";
import Home from "../../pages/Home/Home";
import { hasToken } from "../../utils/authentication.util";
import { getCurrentRoute, isHomePage } from "../../utils/browser.util";
import Header from "../Header/Header";

const Layout = () => {
  const currentRoute = getCurrentRoute(useLocation());
  const navigate = useNavigate();
  const loggedIn = hasToken();

  useEffect(() => {
    if (!loggedIn) {
      navigate("");
    }
  }, [loggedIn, navigate]);

  const isShowHomePage = useMemo(() => {
    return !loggedIn || isHomePage(currentRoute);
  }, [loggedIn, currentRoute]);

  return (
    <>
      {isShowHomePage ? (
        <Home />
      ) : (
        <>
          <Header />
          <Container style={{ paddingTop: "20px" }}>
            <Outlet />
          </Container>
        </>
      )}
    </>
  );
};

export default Layout;
