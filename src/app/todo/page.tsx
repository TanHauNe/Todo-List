"use client";

import { PostItem } from "@/components";
import { deletePost, getPostList, startEditPost } from "@/redux/blog/blogSlice";
import { RootState, useAppDispatch } from "@/redux/store";
import { getSessionStorage } from "@/utils/cookie";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";

const List = () => {
  const postList = useSelector((state: RootState) => state.blog.postList);

  const dispatch = useAppDispatch();
  const route = useRouter();

  useEffect(() => {
    dispatch(getPostList());
  }, [dispatch]);

  const handleDelete = (postId: string) => {
    dispatch(deletePost(postId));
  };

  const handleStartEditPost = (postId: string) => {
    route.replace(`todo/${postId}`);
  };

  const handleCreate = () => {
    route.push("create");
  };

  return (
    <div className={styles.container}>
      {postList.map((post) => (
        <PostItem
          post={post}
          key={post?._id}
          handleDelete={handleDelete}
          handleStartEditPost={handleStartEditPost}
        />
      ))}
      <div onClick={handleCreate} className={styles.create_button}>
        +
      </div>
    </div>
  );
};

export default List;
