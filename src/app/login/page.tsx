"use client";

import { ButtonComponent, InputComponent } from "@/components";
import { RootState, useAppDispatch } from "@/redux/store";
import { loginUser } from "@/redux/user/userSlice";
import { ILogin } from "@/types/User.type";
import { schema } from "@/utils/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, message } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./page.module.css";

const Login = () => {
  const loginSchema = schema.pick(["email", "password"]);
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.user);
  const error = useSelector((state: RootState) => state.user.error);
  const auth = user.auth.access_token;

  useEffect(() => {
    if (auth) {
      route.push("blog");
    }
  }, [auth]);

  useEffect(() => {
    if (error.message) {
      toast.warning(error.message);
    }
  }, [error]);

  const route = useRouter();
  const form = useForm<ILogin>({
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
  });

  const { control, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data: ILogin) => {
    const loginData = {
      email: data.email,
      password: data.password,
    };

    dispatch(loginUser(loginData));
  };

  return (
    <div className={styles.container}>
      {contextHolder}
      <Form
        onFinish={handleSubmit(onSubmit)}
        className={styles.login_form}
        layout="vertical"
      >
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
          name="password"
          validateStatus={errors.password ? "error" : ""}
          help={errors.password?.message}
          label="Password"
        >
          <InputComponent
            name="password"
            placeholder="Enter password"
            control={control}
            isPassword
          />
        </Form.Item>
        <ButtonComponent htmlType="submit" content="Login" />
      </Form>
      <div>
        <ToastContainer limit={2} />
      </div>
    </div>
  );
};

export default Login;
