"use client";

import { useEffect, useState } from "react";
import { IPost } from "../types/Post.type";
import styles from "./PostItem.module.css";
import { Tag, Typography } from "antd";
import { ButtonComponent } from ".";
import { status } from "@/configs/status";

interface PostItemType {
  post: IPost;
  handleDelete: (postId: string) => void;
  handleStartEditPost: (postId: string) => void;
}

const PostItem = ({
  post,
  handleDelete,
  handleStartEditPost,
}: PostItemType) => {
  const { Text, Title } = Typography;
  const [statusArray, setStatusArray] = useState({
    color: "",
    text: "",
  });

  useEffect(() => {
    if (post.status === status.doing) {
      setStatusArray({
        color: "processing",
        text: "Doing",
      });
    } else if (post.status === status.done) {
      setStatusArray({
        color: "success",
        text: "Done",
      });
    } else {
      setStatusArray({
        color: "default",
        text: "Do not",
      });
    }
  }, [post]);

  return (
    <div className={styles.card}>
      <Title title={post?.title} level={4} className={styles.card_title}>
        {post?.title}
      </Title>
      <div className={styles.card_body}>
        <Text title={post.desc} className={styles.card_text}>
          {post.desc}
        </Text>
        <div className={styles.button_group}>
          <Tag color={statusArray.color} className={styles.button_item}>
            {statusArray.text}
          </Tag>
          <ButtonComponent
            className={styles.button_item}
            content="Edit"
            onClick={() => handleStartEditPost(post._id || "")}
          />
          <ButtonComponent
            className={styles.button_item}
            danger
            content="Delete"
            onClick={() => handleDelete(post._id || "")}
          />
        </div>
      </div>
    </div>
  );
};

export default PostItem;
