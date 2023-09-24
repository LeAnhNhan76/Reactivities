import { Card, CardProps, Header } from "semantic-ui-react";
import Skeleton from "../Skeleton/Skeleton";
import PlaceholderPara from "./PlaceholderPara";

type Props = CardProps & {
  headerLines?: number;
  lines?: number;
};

const PlaceholderCard = ({
  headerLines = 0,
  lines = 1,
  ...otherProps
}: Props) => {
  return (
    <>
      {headerLines > 0 && (
        <Header>
          <Skeleton count={headerLines}></Skeleton>
        </Header>
      )}
      <Card {...otherProps}>
        <Card.Content>
          <PlaceholderPara lines={lines}></PlaceholderPara>
        </Card.Content>
      </Card>
    </>
  );
};

export default PlaceholderCard;
