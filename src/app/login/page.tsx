"use client";

import { ButtonComponent, InputComponent } from "@/components";
import { RootState, useAppDispatch } from "@/redux/store";
import { loginUser, setSuccessError } from "@/redux/user/userSlice";
import { ILogin } from "@/types/User.type";
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

const Login = () => {
  const loginSchema = schema.pick(["email", "password"]);
  const { Title } = Typography;
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.user);
  const { error, success, isLoading } = useSelector(
    (state: RootState) => state.user
  );
  const auth = user.auth.access_token;
  const route = useRouter();


  useEffect(() => {
    if (auth) {
      route.push("todo");
    }
  }, [auth]);

  useEffect(() => {
    if (error.message) {
      toast.warning(error.message);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      toast.success("Login successfully");
    }
  }, [success]);

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

    dispatch(loginUser(loginData)).then(() => {
      dispatch(setSuccessError());
    });
  };

  return (
    <div className={styles.container}>
      <Form
        onFinish={handleSubmit(onSubmit)}
        className={styles.login_form}
        layout="vertical"
      >
        <Title style={{ textAlign: "center", marginTop: "0" }}>Login</Title>
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
        <ButtonComponent
          loading={isLoading ? true : false}
          className={styles.button}
          htmlType="submit"
          content="Login"
        />
        <Link href={"/register"}>
          <Title className={styles.text} italic level={5}>
            Register account
          </Title>
        </Link>
      </Form>
      <ToastContainer limit={2} />
    </div>
  );
};

export default Login;
