import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { SemanticToastContainer } from "react-semantic-toasts";

const Layout = () => {
  const [user] = useState(false);

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
      <SemanticToastContainer position="bottom-right" animation="bounce" />
    </div>
  );
};

export default Layout;
