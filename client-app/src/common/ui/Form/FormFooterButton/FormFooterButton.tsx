import { css } from "../../../../utils/css.util";
import "./FormFooterButton.scss";

type FloadDirection = "left" | "right" | "center" | undefined;
type Props = {
  float?: FloadDirection;
  gap?: string;
  children?: React.ReactNode;
};

const FormFooterButton = ({
  float = "right",
  gap = "10px",
  children,
}: Props) => {
  return (
    <div className={css("form-footer-button", float)} style={{ gap: gap }}>
      {children}
    </div>
  );
};

export default FormFooterButton;
