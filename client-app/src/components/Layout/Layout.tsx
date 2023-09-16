import { Outlet, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useLocation } from "react-router-dom";
import { hasToken } from "../../utils/authentication.util";
import { useState, useEffect } from "react";

const Layout = () => {
  const location = useLocation();
  const route = location.pathname.split("/")[1];
  const layoutRoutes = ["activities", "errors", "profile"];
  const navigate = useNavigate();
  const loggedIn = hasToken();

  const [type, setType] = useState<"single" | "layout">();

  useEffect(() => {
    if (!loggedIn) {
      navigate("");
    }
  }, [loggedIn]);

  useEffect(() => {
    setType(layoutRoutes.includes(route) ? "layout" : "single");
  }, [route]);

  return (
    <div>
      {type === "single" && <Outlet />}
      {type === "layout" && (
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      )}
    </div>
  );
};

export default Layout;
