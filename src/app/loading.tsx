import { Spin } from "antd";
import "./globals.css";

const Loading = () => {
  return (
    <div className="center">
      <Spin size="large" />
    </div>
  );
};

export default Loading;
