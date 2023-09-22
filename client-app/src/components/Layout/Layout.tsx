import { Outlet, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import { useLocation } from "react-router-dom";
import { hasToken } from "../../utils/authentication.util";
import { useState, useEffect } from "react";
import { Container } from "semantic-ui-react";

const Layout = () => {
  const location = useLocation();
  const route = location.pathname.split("/")[1];
  const layoutRoutes = ["activities", "errors", "profile"];
  const navigate = useNavigate();
  const loggedIn = hasToken();

  const [useLayout, setUseLayout] = useState(false);

  useEffect(() => {
    if (layoutRoutes.includes(route) && !loggedIn) {
      navigate("");
    }
    // eslint-disable-next-line
  }, [loggedIn]);

  useEffect(() => {
    setUseLayout(layoutRoutes.includes(route));
    // eslint-disable-next-line
  }, [route]);

  return (
    <div>
      {!useLayout ? (
        <Outlet />
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
