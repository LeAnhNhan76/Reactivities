import { Dimmer, Loader, Segment } from "semantic-ui-react";
import "./Loading.scss";

const Loading = () => {
  return (
    <Segment>
      <Dimmer page active className="racti-loading">
        <Loader inverted content="Loading..." />
      </Dimmer>
    </Segment>
  );
};

export default Loading;
