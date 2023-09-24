import Skeleton from "react-loading-skeleton";

type Props = {
  lines: number;
};

const PlaceholderPara = ({ lines }: Props) => {
  return (
    <div>
      {Array.from(Array(lines).keys()).map((item, index) => (
        <>
          {index % 5 === 0 && <Skeleton key={index} width={"85%"} height={8} />}
          {index % 5 === 1 && <Skeleton key={index} width={"50%"} height={8} />}
          {index % 5 === 2 && <Skeleton key={index} width={"70%"} height={8} />}
          {index % 5 === 3 && <Skeleton key={index} width={"60%"} height={8} />}
          {index % 5 === 4 && <Skeleton key={index} width={"40%"} height={8} />}
        </>
      ))}
    </div>
  );
};

export default PlaceholderPara;
