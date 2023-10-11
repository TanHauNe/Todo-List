"use client";

import { ButtonComponent, InputComponent } from "@/components";
import { addPost, setSuccess } from "@/redux/blog/blogSlice";
import { RootState, useAppDispatch } from "@/redux/store";
import { IPost } from "@/types/Post.type";
import { getSessionStorage } from "@/utils/cookie";
import { schema } from "@/utils/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, Input, Select, Typography } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./page.module.css";

const Create = () => {
  const { Text, Title } = Typography;
  const { TextArea } = Input;
  const createPostSchema = schema.pick(["title", "desc", "status"]);
  const [userId, setUserId] = useState("");
  const dispatch = useAppDispatch();
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
      toast.success("Create successfully");
      reset();
      route.push("todo");
    }
  }, [success]);

  const optionsSelect = [
    { value: 1, label: "Do not" },
    { value: 2, label: "Doing" },
    { value: 3, label: "Done" },
  ];

  const form = useForm<IPost>({
    defaultValues: {
      title: "",
      desc: "",
      status: undefined,
    },
    mode: "all",
    resolver: yupResolver(createPostSchema) as any,
  });
  const { control, handleSubmit, formState, reset } = form;
  const { errors } = formState;

  const onSubmit = (data: IPost) => {
    const addPostData = {
      title: data.title,
      desc: data.desc,
      status: Number(data.status),
      user_id: userId?.toString(),
    };

    dispatch(addPost(addPostData));

    setTimeout(() => {
      dispatch(setSuccess());
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <Form
        className={styles.post_form}
        onFinish={handleSubmit(onSubmit)}
        layout="vertical"
      >
        <Title style={{ textAlign: "center", marginTop: "0" }}>
          Create Post
        </Title>
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
                style={{ height: 120, marginBottom: 24 }}
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

        <ButtonComponent htmlType="submit" content="Add post" />
      </Form>
      <ToastContainer limit={2} />
    </div>
  );
};

export default Create;
