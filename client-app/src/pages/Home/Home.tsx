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
          <Logo size="huge" />
          {!loggedIn && (
            <>
              <div className="">
                <Button
                  type="button"
                  color="orange"
                  content={"Login"}
                  className="btn-login"
                  size="massive"
                  style={{ width: "200px" }}
                  onClick={() => setOpenLogin(!openLogin)}
                />
                <Button
                  type="button"
                  color="grey"
                  content={"Register"}
                  size="massive"
                  style={{ width: "200px" }}
                  onClick={() => {}}
                />
              </div>
              <Divider horizontal content={"OR"} inverted />
              <Button
                color="facebook"
                icon={<Icon name="facebook" />}
                content={"Login with Facebook"}
                size="massive"
              />
            </>
          )}
          {loggedIn && (
            <>
              <Header
                content="Helo my friend, hope you have a nice day! <3 <3 <3"
                size="large"
              />
              <Link to="/activities">
                <Button
                  content={"Let discover amazing things today!"}
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
