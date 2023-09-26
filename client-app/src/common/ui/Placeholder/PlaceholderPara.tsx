import Skeleton from "react-loading-skeleton";

type Props = {
  lines: number;
};

const PlaceholderPara = ({ lines }: Props) => {
  const widthLines = ["100%", "85%", "50%", "70%", "60%", "40%"];

  return (
    <div>
      {Array.from(Array(lines).keys()).map((item, index) => (
        <Skeleton
          key={index}
          width={widthLines[index % widthLines.length]}
          height={8}
        />
      ))}
    </div>
  );
};

export default PlaceholderPara;
