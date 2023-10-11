"use client";

import { useEffect, useState } from "react";
import { IPost } from "../types/Post.type";
import styles from "./PostItem.module.css";
import { Tag, Typography } from "antd";
import { ButtonComponent } from ".";

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
  const [status, setStatus] = useState({
    color: "",
    text: "",
  });

  useEffect(() => {
    if (post.status === 2) {
      setStatus({
        color: "processing",
        text: "Doing",
      });
    } else if (post.status === 3) {
      setStatus({
        color: "success",
        text: "Done",
      });
    } else {
      setStatus({
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
          <Tag color={status.color} className={styles.button_item}>
            {status.text}
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
