"use client";

import { Spin } from "antd";
import styles from "./page.module.css";

const Loading = () => {
  return (
    <div className={styles.center}>
      <Spin size="large" />
    </div>
  );
};

export default Loading;
