"use client";

import { ButtonComponent, InputComponent } from "@/components";
import { status } from "@/configs/status";
import { addPost, setClearState } from "@/redux/blog/blogSlice";
import { RootState, useAppDispatch } from "@/redux/store";
import { IPost } from "@/types/Post.type";
import { getSessionStorage } from "@/utils/cookie";
import { schema } from "@/utils/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, Input, Select, Typography } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./page.module.css";

const Create = () => {
  const { Title } = Typography;
  const { TextArea } = Input;
  const createPostSchema = schema.pick(["title", "desc", "status"]);
  const [userId, setUserId] = useState("");
  const dispatch = useAppDispatch();
  const { error, success, isLoading } = useSelector(
    (state: RootState) => state.blog
  );
  const route = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = getSessionStorage();
      return setUserId(user?._id || "");
    }
  }, []);

  useEffect(() => {
    if (error?.message) {
      toast.warning(error?.message);
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
    { value: status.doNot, label: "Do not" },
    { value: status.doing, label: "Doing" },
    { value: status.done, label: "Done" },
  ];

  const form = useForm<IPost>({
    defaultValues: {
      title: "",
      desc: "",
      status: undefined,
    },
    mode: "all",
    resolver: yupResolver(createPostSchema),
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

    dispatch(addPost(addPostData)).then(() => {
      dispatch(setClearState());
    });
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

        <ButtonComponent
          loading={isLoading}
          htmlType="submit"
          content="Add post"
        />

        <Link className={styles.text} href={"/todo"}>
          Todo list
        </Link>
      </Form>
      <ToastContainer limit={2} />
    </div>
  );
};

export default Create;
