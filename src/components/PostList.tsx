import { deletePost, getPostList, startEditPost } from "@/redux/blog/blogSlice";
import { RootState, useAppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./PostList.module.css";
import { PostItem } from ".";

const PostList = () => {
  const postList = useSelector((state: RootState) => state.blog.postList);
  const user = useSelector((state: RootState) => state.user.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPostList());
  }, [dispatch]);

  const handleDelete = (postId: string) => {
    dispatch(deletePost(postId));
  };

  const handleStartEditPost = (postId: string) => {
    dispatch(startEditPost(postId));
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
    </div>
  );
};

export default PostList;
