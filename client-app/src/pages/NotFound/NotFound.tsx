import { Button, Container, Header, Message } from "semantic-ui-react";
import "./NotFound.scss";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container textAlign="center" className="not-found-container">
      <Header
        content={"404 - Not found"}
        subheader={"The page was not found or removed!"}
        className="text"
      />
      <Link to={""}>
        <Button content="Go back Home" />
      </Link>
    </Container>
  );
};

export default NotFound;
