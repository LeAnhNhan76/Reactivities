import "./NoData.scss";

type Props = {
  content?: string | React.ReactNode;
};

const NoData = ({ content }: Props) => {
  return (
    <div className="no-data">
      <span>{content || "< No data, please try other filter >"}</span>
    </div>
  );
};

export default NoData;
