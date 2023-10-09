"use client";

import { CreatePost, PostList } from "@/components";
import styles from "./page.module.css";

const Todo = () => {
  return (
    <div className={styles.container}>
      <CreatePost />
      <PostList />
    </div>
  );
};

export default Todo;
