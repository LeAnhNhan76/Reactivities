import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Divider, Header, Icon } from "semantic-ui-react";
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
          <Logo />
          {!loggedIn && (
            <>
              <div className="">
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
            </>
          )}
          {loggedIn && (
            <>
              <Header
                content="Helo helo, hope you have a nice day! <3 <3 <3"
                size="large"
              />
              <Link to="/activities">
                <Button
                  content={"Discover your amazing activities today!"}
                  icon="heart"
                  positive
                  size="large"
                />
              </Link>
            </>
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
