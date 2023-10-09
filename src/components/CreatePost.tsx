"use client";

import { getSessionStorage } from "@/utils/cookie";
import { addPost, cancelEditPost, updatePost } from "@/redux/blog/blogSlice";
import { RootState, useAppDispatch } from "@/redux/store";
import { schema } from "@/utils/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form, Select, Typography } from "antd";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { IPost } from "../types/Post.type";
import styles from "./CreatePost.module.css";
import { InputComponent } from ".";

const CreatePost = () => {
  const { Text } = Typography;
  const createPostSchema = schema.pick(["title", "desc"]);
  const [userId, setUserId] = useState("");
  const dispatch = useAppDispatch();
  const editPost = useSelector((state: RootState) => state.blog.editPost);
  const errorMessage = useSelector(
    (state: RootState) => state.blog.errorMessage
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = getSessionStorage();
      return setUserId(user?._id || "");
    }
  }, []);

  const optionsSelect = [
    { value: 1, label: "Chưa làm" },
    { value: 2, label: "Đang làm" },
    { value: 3, label: "Đã làm" },
  ];

  const form = useForm<IPost>({
    defaultValues: {
      title: editPost?.title,
      desc: editPost?.desc,
      status: editPost?.status,
    },
    mode: "all",
    resolver: yupResolver(createPostSchema),
  });
  const { control, handleSubmit, formState, reset } = form;
  const { errors } = formState;

  useEffect(() => {
    reset(editPost);
  }, [editPost]);

  const onSubmit = (data: IPost) => {
    const postData = {
      title: data.title,
      desc: data.desc,
      status: Number(data.status),
      user_id: userId?.toString(),
    };

    if (editPost) {
      dispatch(
        updatePost({
          postId: editPost._id || "",
          body: postData,
        })
      );
      dispatch(
        updatePost({
          postId: editPost._id || "",
          body: postData,
        })
      );
    } else {
      dispatch(addPost(postData));
    }
  };

  const handleCancelEditPost = () => {
    dispatch(cancelEditPost());
  };

  return (
    <div className={styles.container}>
      <Form
        className={styles.post_form}
        onFinish={handleSubmit(onSubmit)}
        onReset={handleCancelEditPost}
        layout="vertical"
      >
        <Form.Item
          name="title"
          validateStatus={errors.title ? "error" : ""}
          label="Tiêu đề"
          help={errors.title?.message}
        >
          <InputComponent name="title" control={control} />
        </Form.Item>
        <Form.Item
          name="desc"
          validateStatus={errors.desc ? "error" : ""}
          help={errors.desc?.message}
          label="Mô tả"
        >
          <InputComponent name="desc" control={control} />
        </Form.Item>

        <Form.Item name="status" label="Trạng thái">
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select
                style={{ width: 120 }}
                options={optionsSelect}
                {...field}
              />
            )}
          />
        </Form.Item>

        <div className={styles.flex_center}>
          {errorMessage === "" ? "" : <Text type="danger">{errorMessage}</Text>}
        </div>
        {editPost.title !== "" ? (
          <div className={styles.flex_center}>
            <Button htmlType="submit" type="primary">
              Update Post
            </Button>
            <Button danger htmlType="reset" type="primary">
              Cancel
            </Button>
          </div>
        ) : (
          <Button htmlType="submit" type="primary">
            Upload Post
          </Button>
        )}
      </Form>
    </div>
  );
};

export default CreatePost;
