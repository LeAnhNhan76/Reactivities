import { Image } from "semantic-ui-react";
import "./NoData.scss";

type Props = {
  content?: string | React.ReactNode;
};

const NoData = ({ content }: Props) => {
  return (
    <div className="no-data">
      <Image
        src={
          "https://t4.ftcdn.net/jpg/04/75/01/23/360_F_475012363_aNqXx8CrsoTfJP5KCf1rERd6G50K0hXw.jpg"
        }
        alt=""
        size="small"
      />
      {/* <Logo />
      <Header as={"h4"} color="orange">
        No data
      </Header> */}
      <span>{content || "< No data, please try other filter >"}</span>
    </div>
  );
};

export default NoData;
