import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Divider, Icon } from "semantic-ui-react";
import Login from "../../components/Login/Login";
import Logo from "../../components/Logo/Logo";
import { hasToken } from "../../utils/authentication.util";
import "./Home.scss";

const Home = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const loggedIn = hasToken();
  return (
    <div className="home">
      <div className="home-container">
        <div className="home-wrapper">
          <Logo size="huge" />
          {!loggedIn && (
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
              <Divider horizontal content={"OR"} inverted />
              <Button
                color="facebook"
                icon={<Icon name="facebook" />}
                content={"Login with Facebook"}
              />
            </div>
          )}
          {loggedIn && (
            <Link to="/activities">
              <Button
                type="button"
                color="orange"
                content={"Take your activities"}
                size="big"
                fluid
              />
            </Link>
          )}

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
