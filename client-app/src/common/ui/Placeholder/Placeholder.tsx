import PlaceholderCard from "./PlaceholderCard";
import PlaceholderPara from "./PlaceholderPara";

type Props = {
  lines?: number;
};

const Placeholder = ({ lines = 1 }: Props) => {
  return <PlaceholderPara lines={lines}></PlaceholderPara>;
};

Placeholder.Para = PlaceholderPara;
Placeholder.Card = PlaceholderCard;

export default Placeholder;
