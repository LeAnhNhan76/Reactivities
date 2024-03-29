import { Header } from "semantic-ui-react";
import "./Logo.scss";

type Props = {
  size?: "huge" | "tiny" | "small" | "medium" | "large" | undefined;
};

const Logo = ({ size }: Props) => {
  return (
    <Header
      content="Reactivities"
      icon={"users"}
      className="logo"
      color="orange"
      size={size || "medium"}
    />
  );
};

export default Logo;
