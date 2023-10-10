import { IButton } from "@/types/Common.type";
import { Button } from "antd";

const ButtonComponent = ({
  htmlType,
  className,
  type,
  content,
  onClick,
  ...props
}: IButton) => {
  return (
    <Button
      className={className || ""}
      onClick={onClick}
      htmlType={htmlType || "button"}
      type={type || "primary"}
      {...props}
    >
      {content}
    </Button>
  );
};

export default ButtonComponent;
