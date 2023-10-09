"use client";

import { Card, Tag } from "antd";
import { useEffect, useState } from "react";
import { ButtonComponent } from ".";
import { IPost } from "../types/Post.type";
import styles from "./PostItem.module.css";

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
  const [status, setStatus] = useState({
    color: "",
    text: "",
  });

  useEffect(() => {
    if (post.status === 2) {
      setStatus({
        color: "processing",
        text: "Đang làm",
      });
    } else if (post.status === 3) {
      setStatus({
        color: "success",
        text: "Đã làm",
      });
    } else {
      setStatus({
        color: "default",
        text: "Chưa làm",
      });
    }
  }, [post]);

  return (
    <Card bordered={false} title={post?.title} hoverable style={{ width: 600 }}>
      <p>{post.desc}</p>
      <div className={styles.button_group}>
        <Tag color={status.color} className={styles.flex_center}>
          {status.text}
        </Tag>
        <ButtonComponent
          content="Edit"
          onClick={() => handleStartEditPost(post._id || "")}
        />
        <ButtonComponent
          danger
          content="Delete"
          onClick={() => handleDelete(post._id || "")}
        />
      </div>
    </Card>
  );
};

export default PostItem;
