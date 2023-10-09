"use client";

import { ButtonComponent, InputComponent } from "@/components";
import { ILogin } from "@/types/User.type";
import { schema } from "@/utils/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, Typography, message } from "antd";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import styles from "./page.module.css";

const Register = () => {
  const loginSchema = schema.pick(["email", "password"]);
  const { Title } = Typography;
  const [messageApi, contextHolder] = message.useMessage();
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

  const onSubmit = () => {};

  return (
    <div className={styles.container}>
      {contextHolder}

      <Form
        onFinish={handleSubmit(onSubmit)}
        className={styles.register_form}
        layout="vertical"
      >
        <Title style={{ textAlign: "center" }}>Register</Title>
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
          name="fullName"
          validateStatus={errors.email ? "error" : ""}
          help={errors.email?.message}
          label="Full name"
        >
          <InputComponent
            placeholder="Enter full name"
            name="fullName"
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
        <ButtonComponent htmlType="submit" content="Register" />
      </Form>
    </div>
  );
};

export default Register;
