"use client";

import { InputComponent } from "@/components";
import { getPost, setSuccess, updatePost } from "@/redux/blog/blogSlice";
import { RootState, useAppDispatch } from "@/redux/store";
import { IPost } from "@/types/Post.type";
import { getSessionStorage } from "@/utils/cookie";
import { schema } from "@/utils/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form, Input, Select, Typography } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./page.module.css";
import { status } from "@/configs/status";

const Edit = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { Text, Title } = Typography;
  const { TextArea } = Input;
  const createPostSchema = schema.pick(["title", "desc", "status"]);
  const [userId, setUserId] = useState("");
  const dispatch = useAppDispatch();
  const editPost = useSelector((state: RootState) => state.blog.editPost);
  const { error, success } = useSelector((state: RootState) => state.blog);
  const route = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = getSessionStorage();
      return setUserId(user?._id || "");
    }
  }, []);

  useEffect(() => {
    if (error?.errors) {
      toast.warning(
        error?.errors[0][0].toUpperCase() + error?.errors[0].slice(1)
      );
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      toast.success("Update successfully");
      reset();
      route.push("/todo");
    }
  }, [success]);

  useEffect(() => {
    dispatch(getPost(id));
  }, [dispatch]);

  const optionsSelect = [
    { value: status.doNot, label: "Do not" },
    { value: status.doing, label: "Doing" },
    { value: status.done, label: "Done" },
  ];

  const form = useForm<IPost>({
    defaultValues: {
      title: editPost?.title || "",
      desc: editPost?.desc || "",
      status: editPost?.status || 1,
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

    dispatch(
      updatePost({
        postId: editPost._id || "",
        body: postData,
      })
    )
      .then(() => {
        dispatch(
          updatePost({
            postId: editPost._id || "",
            body: postData,
          })
        );
      })
      .then(() => {
        dispatch(setSuccess());
      });
  };

  const handleCancelEditPost = () => {
    route.push("/list");
  };
  return (
    <div className={styles.container}>
      <Form
        className={styles.post_form}
        onFinish={handleSubmit(onSubmit)}
        layout="vertical"
      >
        <Title style={{ textAlign: "center", marginTop: "0" }}>Edit Post</Title>
        <Form.Item
          name="title"
          validateStatus={errors.title ? "error" : ""}
          label="Title"
          help={errors.title?.message}
        >
          <InputComponent
            placeholder="Enter title"
            name="title"
            control={control}
          />
        </Form.Item>
        <Form.Item
          name="desc"
          validateStatus={errors.desc ? "error" : ""}
          help={errors.desc?.message}
          label="Description"
        >
          <Controller
            name="desc"
            control={control}
            render={({ field }) => (
              <TextArea
                style={{ height: 120, margin: "0" }}
                placeholder="Enter description"
                {...field}
              />
            )}
          />
        </Form.Item>

        <Form.Item
          name="status"
          validateStatus={errors.status ? "error" : ""}
          help={errors.status?.message}
          label="Status"
        >
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select
                placeholder="Choose one"
                style={{ width: 120 }}
                options={optionsSelect}
                {...field}
              />
            )}
          />
        </Form.Item>

        <div className={styles.button_group}>
          <Button
            className={styles.button_item}
            htmlType="submit"
            type="primary"
          >
            Update
          </Button>
          <Button
            className={styles.button_item}
            onClick={handleCancelEditPost}
            danger
            htmlType="reset"
            type="primary"
          >
            Cancel
          </Button>
        </div>
      </Form>
      <ToastContainer limit={2} />
    </div>
  );
};

export default Edit;
