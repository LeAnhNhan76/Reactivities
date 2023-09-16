import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  const route = location.pathname.split("/")[1];
  const layoutRoutes = ["activities", "errors"];

  if (!layoutRoutes.includes(route)) return <Outlet />;
  return (
    <div>
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    </div>
  );
};

export default Layout;
