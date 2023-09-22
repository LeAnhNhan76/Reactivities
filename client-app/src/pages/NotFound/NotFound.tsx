import { Link } from "react-router-dom";
import { Button, Container, Header } from "semantic-ui-react";
import "./NotFound.scss";
import { hasToken } from "../../utils/authentication.util";

const NotFound = () => {
  const linkToHome = (
    <Link to={""}>
      <Button content="Go back Home" />
    </Link>
  );

  const linkToActivities = (
    <Link to={"activities"}>
      <Button content="Go to activities" />
    </Link>
  );

  return (
    <Container textAlign="center" className="not-found-container">
      <Header
        content={"404 - Not found"}
        subheader={"The page was not found or removed!"}
        className="text"
      />
      {hasToken() ? linkToActivities : linkToHome}
    </Container>
  );
};

export default NotFound;
