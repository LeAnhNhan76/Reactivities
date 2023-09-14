import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Layout = () => {
  const [user, setUser] = useState(false);

  return (
    <div>
      {!user && <Outlet />}
      {user && (
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
