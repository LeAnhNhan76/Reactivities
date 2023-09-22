import {
  Segment,
  Image,
  Header as SemanticHeader,
  Button,
} from "semantic-ui-react";
import { formatDate } from "../../../utils/dateTime.util";
import "./Header.scss";

const Header = () => {
  return (
    <div className="activity-detail-header">
      <Segment.Group>
        <Segment className="banner">
          <Image
            src="https://images.pexels.com/photos/2513605/pexels-photo-2513605.jpeg?auto=compress&cs=tinysrgb&w=400"
            alt=""
          />
          <div className="desc">
            <SemanticHeader
              content={"Future Activity 5"}
              subheader={formatDate(new Date())}
            />
            <span>
              Hosted by <span className="hoster">Tome</span>
            </span>
          </div>
        </Segment>
        <Segment>
          <Button>Cancel Activity</Button>
          <Button floated="right" color="orange">
            Manage Event
          </Button>
        </Segment>
      </Segment.Group>
    </div>
  );
};

export default Header;
