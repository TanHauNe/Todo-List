import { Spin } from "antd";
import styles from "./LoadingComponent.module.css";

const LoadingComponent = () => {
  return (
    <div className={styles.center}>
      <Spin size="large" />
    </div>
  );
};

export default LoadingComponent;
