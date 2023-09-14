import { Button, Divider, Icon } from "semantic-ui-react";
import Logo from "../../components/Logo/Logo";
import "./Home.scss";

const Home = () => {
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
              onClick={() => {}}
              className="btn-login"
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
        </div>
      </div>
    </div>
  );
};

export default Home;
