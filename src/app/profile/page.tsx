"use client";

import { ButtonComponent, InputComponent } from "@/components";
import { RootState, useAppDispatch } from "@/redux/store";
import { editProfile, setSuccessError } from "@/redux/user/userSlice";
import { IEditProfile, IUser } from "@/types/User.type";
import { getSessionStorage, getTokenFromCookie } from "@/utils/cookie";
import { schema } from "@/utils/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, Typography, Upload } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./page.module.css";

const Profile = () => {
  const editSchema = schema.pick(["email", "full_name", "url_img"]);
  const { Title } = Typography;
  const [user, setUser] = useState<IUser>();
  const dispatch = useAppDispatch();
  const route = useRouter();
  const { error, success, isLoading } = useSelector(
    (state: RootState) => state.user
  );
  const form = useForm<IEditProfile>({
    mode: "all",
    defaultValues: {
      email: user?.email,
      full_name: user?.full_name,
      url_img: user?.url_img,
    },
    resolver: yupResolver(editSchema),
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = getSessionStorage();
      const accessToken = getTokenFromCookie("token");
      if (!accessToken) {
        route.push("/login");
      }
      return setUser(user || "");
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
    }
  }, [success]);

  useEffect(() => {
    reset(user);
  }, [user]);

  const { control, handleSubmit, formState, reset } = form;
  const { errors } = formState;

  const onSubmit = (data: IEditProfile) => {
    dispatch(editProfile(data)).then(() => {
      dispatch(setSuccessError());
    });
  };

  return (
    <div className={styles.container}>
      <Form
        onFinish={handleSubmit(onSubmit)}
        className={styles.login_form}
        layout="horizontal"
        // layout="vertical"
      >
        <Title style={{ textAlign: "center", marginTop: "0" }}>Profile</Title>
        <Form.Item
          name="email"
          validateStatus={errors.email ? "error" : ""}
          help={errors.email?.message}
          label="Email"
        >
          <InputComponent
            placeholder="Enter email"
            name="email"
            control={control}
          />
        </Form.Item>

        <Form.Item
          name="full_name"
          validateStatus={errors.full_name ? "error" : ""}
          help={errors.full_name?.message}
          label="Full name"
        >
          <InputComponent
            placeholder="Enter full name"
            name="full_name"
            control={control}
          />
        </Form.Item>
        <Form.Item
          className={styles.upload_group}
          name="url_img"
          validateStatus={errors.url_img ? "error" : ""}
          help={errors.url_img?.message}
          label="Url image"
        >
          <Upload>
            <ButtonComponent
              className={styles.upload_button}
              htmlType="button"
              content="Upload file"
            />
          </Upload>
        </Form.Item>
        <ButtonComponent
          loading={isLoading ? true : false}
          className={styles.button}
          htmlType="submit"
          content="Update profile"
        />
      </Form>
      <ToastContainer limit={2} />
    </div>
  );
};

export default Profile;
