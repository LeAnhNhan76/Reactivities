import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Divider, Icon } from "semantic-ui-react";
import Logo from "../../common/ui/Logo/Logo";
import Login from "../../components/Login/Login";
import { RoutingConstants } from "../../constants/routing.constant";
import { hasToken } from "../../utils/authentication.util";
import "./Home.scss";

const Home = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const loggedIn = hasToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate(RoutingConstants.Activities);
    }
  }, []);

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
