import { Header, Icon } from "semantic-ui-react";

type Props = {
  size?: "huge" | "tiny" | "small" | "medium" | "large" | undefined;
};

const Logo = ({ size }: Props) => {
  return (
    <Header
      content="Reactivities"
      icon={<Icon name="bicycle" />}
      className="logo"
      color="orange"
      size={size || "medium"}
    />
  );
};

export default Logo;
