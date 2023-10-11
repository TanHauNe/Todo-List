"use client";

import { ButtonComponent, InputComponent } from "@/components";
import { RootState, useAppDispatch } from "@/redux/store";
import { registerUser, setSuccessError } from "@/redux/user/userSlice";
import { IRegister } from "@/types/User.type";
import { schema } from "@/utils/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, Typography } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./page.module.css";

const Register = () => {
  const registerSchema = schema.pick([
    "email",
    "full_name",
    "url_img",
    "password",
    "confirm_password",
  ]);
  const dispatch = useAppDispatch();
  const { Title } = Typography;
  const { error, success } = useSelector((state: RootState) => state.user);
  const route = useRouter();
  const form = useForm<IRegister>({
    mode: "all",
    defaultValues: {
      email: "",
      full_name: "",
      url_img:
        "https://res.cloudinary.com/dxs7d4hum/image/upload/v1696847105/fpxmqhslj7urkk9xsscj.png",
      password: "",
      confirm_password: "",
    },
    resolver: yupResolver(registerSchema),
  });
  const { control, handleSubmit, formState } = form;
  const { errors } = formState;

  useEffect(() => {
    if (error.message) {
      toast.warning(error.message);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      toast.success("Register successfully");
    }
  }, [success]);

  const onSubmit = (data: IRegister) => {
    dispatch(registerUser(data));

    setTimeout(() => {
      dispatch(setSuccessError());
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <Form
        onFinish={handleSubmit(onSubmit)}
        className={styles.register_form}
        layout="vertical"
        scrollToFirstError
      >
        <Title style={{ textAlign: "center", marginTop: "0" }}>Register</Title>
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
          name="password"
          validateStatus={errors.password ? "error" : ""}
          help={errors.password?.message}
          label="Password"
        >
          <InputComponent
            placeholder="Enter password"
            name="password"
            control={control}
            isPassword
          />
        </Form.Item>

        <Form.Item
          name="confirm_password"
          validateStatus={errors.confirm_password ? "error" : ""}
          help={errors.confirm_password?.message}
          label="Confirm password"
        >
          <InputComponent
            placeholder="Enter confirm password"
            name="confirm_password"
            control={control}
            isPassword
          />
        </Form.Item>
        <ButtonComponent
          className={styles.button}
          htmlType="submit"
          content="Register"
        />
        <Link href={"/login"}>
          <Title className={styles.text} italic level={5}>
            Login
          </Title>
        </Link>
      </Form>
      <div>
        <ToastContainer limit={2} />
      </div>
    </div>
  );
};

export default Register;
