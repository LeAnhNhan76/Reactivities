import { Dimmer, Loader } from "semantic-ui-react";
import "./Loading.scss";

const Loading = () => {
  return (
    <Dimmer page active className="racti-loading">
      <Loader inverted content="Loading..." />
    </Dimmer>
  );
};

export default Loading;
