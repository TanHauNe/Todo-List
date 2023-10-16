"use client";

import { ButtonComponent, InputComponent } from "@/components";
import { RootState, useAppDispatch } from "@/redux/store";
import {
  editProfile,
  setClearState,
  uploadImage,
} from "@/redux/user/userSlice";
import { IEditProfile, IUser } from "@/types/User.type";
import { getSessionStorage, getTokenFromCookie } from "@/utils/cookie";
import { schema } from "@/utils/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, Image, Typography, Upload } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./page.module.css";
import { RcFile } from "antd/es/upload";
import { path } from "@/configs/path";

const Profile = () => {
  const editSchema = schema.pick(["email", "full_name", "url_img"]);
  const { Title } = Typography;
  const [user, setUser] = useState<IUser>();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const route = useRouter();
  const { error, success, isLoading, urlImg } = useSelector(
    (state: RootState) => state.user
  );
  const form = useForm<IEditProfile>({
    mode: "all",
    defaultValues: {
      email: user?.email || "",
      full_name: user?.full_name || "",
      url_img: user?.url_img || "",
    },
    resolver: yupResolver(editSchema),
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = getSessionStorage();
      const accessToken = getTokenFromCookie("token");
      if (!accessToken) {
        route.push(path.login);
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

  useEffect(() => {
    if (urlImg) {
      setValue("url_img", urlImg);
    }
  }, [urlImg]);

  const { control, handleSubmit, formState, reset, setValue } = form;
  const { errors } = formState;

  const onSubmit = (data: IEditProfile) => {
    dispatch(editProfile(data)).then(() => {
      route.push(path.profile);
      dispatch(setClearState());
    });
  };

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      toast.warning("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 0.2;
    if (!isLt2M) {
      toast.warning("Image must smaller than 200KB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const onChange = (info: any) => {
    if (info.file.status === "done") {
      const formData = new FormData();
      formData.append("file", info.file.originFileObj);
      dispatch(uploadImage(formData));
    }
  };

  return (
    <div className={styles.container}>
      <Form
        onFinish={handleSubmit(onSubmit)}
        className={styles.login_form}
        layout="vertical"
      >
        <Title style={{ textAlign: "center", marginTop: "0" }}>Profile</Title>
        <div className={styles.upload_group}>
          <Image
            width={100}
            height={100}
            style={{ borderRadius: "50%", objectFit: "cover" }}
            src={urlImg || user?.url_img || ""}
            alt=""
          />
          <Upload
            name="avatar"
            className="avatar-uploader"
            showUploadList={false}
            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
            beforeUpload={beforeUpload}
            onChange={onChange}
          >
            <ButtonComponent
              className={styles.upload_button}
              htmlType="button"
              content="Upload file"
            />
          </Upload>
        </div>
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

        <ButtonComponent
          loading={isLoading}
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
