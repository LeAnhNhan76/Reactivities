import { Image } from "semantic-ui-react";
import { AvatarSize } from "../../../constants/style.constant";
import { isNotNullOrUndefined } from "../../../utils/common.util";

type Props = {
  src: string;
  alt?: string;
  size?: "small" | "medium" | "big";
  circular?: boolean;
  title?: string;
  subTitle?: string;
  customTitle?: React.ReactNode;
  imgVerticalAlign?: "top" | "bottom" | "middle";
  subTitleStyle?: React.CSSProperties;
};

const Avatar = ({
  src,
  alt = "",
  size = "small",
  circular = false,
  title,
  subTitle,
  customTitle,
  imgVerticalAlign = "top",
  subTitleStyle,
}: Props) => {
  const numberSize = AvatarSize[size];
  return (
    <div>
      <Image
        src={src}
        alt={alt}
        style={{
          width: numberSize,
          height: numberSize,
          objectFit: "cover",
          marginRight: isNotNullOrUndefined(title) ? "10px" : "",
        }}
        verticalAlign={imgVerticalAlign}
        circular={circular}
      />
      {customTitle ? (
        customTitle
      ) : (
        <div style={{ display: "inline-block", lineHeight: "0px" }}>
          {title && <p style={{ fontWeight: "bold" }}>{title}</p>}
          {subTitle && (
            <span
              style={{
                fontSize: "10px",
                fontWeight: "600",
                fontStyle: "italic",
                color: "var(--secondary-color)",
                ...subTitleStyle,
              }}
            >
              {subTitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Avatar;
