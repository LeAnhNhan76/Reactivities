import { Button, Divider, Icon } from "semantic-ui-react";
import Logo from "../../components/Logo/Logo";
import "./Home.scss";
import { useState } from "react";
import Login from "../../components/Login/Login";

const Home = () => {
  const [openLogin, setOpenLogin] = useState(false);
  return (
    <div className="home">
      <div className="home-container">
        <div className="home-wrapper">
          <Logo size="huge" />
          <div>
            <Button
              type="button"
              color="orange"
              content={"Login"}
              className="btn-login"
              onClick={() => setOpenLogin(!openLogin)}
            />
            <Button
              type="button"
              color="grey"
              content={"Register"}
              onClick={() => {}}
            />
          </div>
          <Divider horizontal content={"OR"} inverted />
          <Button
            color="facebook"
            icon={<Icon name="facebook" />}
            content={"Login with Facebook"}
          />
          {openLogin && (
            <Login
              isOpen={openLogin}
              onDismiss={() => setOpenLogin(!openLogin)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
