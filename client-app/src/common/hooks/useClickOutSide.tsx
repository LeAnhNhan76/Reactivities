import { useEffect } from "react";

type Props = {
  ref: any;
  isOpen?: boolean;
  handleClickOutside?: VoidFunction;
};

const useClickOutside = ({
  ref,
  isOpen,
  handleClickOutside: handleClickOutProp,
}: Props) => {
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        isOpen === true
      ) {
        handleClickOutProp && handleClickOutProp();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, isOpen, handleClickOutProp]);
};

export { useClickOutside };
