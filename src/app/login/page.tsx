"use client";

import { RootState, useAppDispatch } from "@/redux/store";
import { loginUser } from "@/redux/user/userSlice";
import { schema } from "@/utils/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { ILogin } from "../../../types/User.type";
import styles from "./page.module.css";
import { InputComponent } from "@/components";

const Login = () => {
  const loginSchema = schema.pick(["email", "password"]);
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.user);
  const isError = useSelector((state: RootState) => state.user.isError);
  const auth = user.auth.access_token;

  useEffect(() => {
    if (auth) {
      route.push("blog");
    }
  }, [auth]);

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
          <InputComponent placeholder="Email" name="email" control={control} />
        </Form.Item>

        <Form.Item
          name="password"
          validateStatus={errors.password ? "error" : ""}
          help={errors.password?.message}
          label="Password"
        >
          <InputComponent
            name="password"
            placeholder="Password"
            control={control}
          />
        </Form.Item>
        <div>{isError ? "Đăng nhập không thành công" : ""}</div>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
